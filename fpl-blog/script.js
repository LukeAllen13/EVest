// URL for the FPL API endpoint
const API_URL = "https://fantasy.premierleague.com/api/bootstrap-static/";

// Elements from the DOM
const loadDataBtn = document.getElementById("loadDataBtn");
const teamsTableContainer = document.getElementById("teamsTableContainer");
const playersTableContainer = document.getElementById("playersTableContainer");

// Global storage for teams (to map team id to name for players table)
let teamsMap = {};

// Function to fetch FPL data
async function fetchFPLData() {
    try {
      const API_URL = "https://fantasy.premierleague.com/api/bootstrap-static/";
      const proxyUrl = 'https://api.allorigins.hexocode.repl.co/get/?disableCache=true&url=';
      const res = await fetch(proxyUrl + encodeURIComponent(API_URL));
      const data = await res.json();
      // AllOrigins wraps the result in a 'contents' property.
      const parsedData = JSON.parse(data.contents);
      return parsedData;
    } catch (err) {
      console.error("Error fetching FPL data:", err);
      return null;
    }
  }

// Function to render teams table
function renderTeamsTable(teams) {
  let html = `<table>
    <thead>
      <tr>
        <th>Team Name</th>
        <th>Strength</th>
        <th>Overall Home</th>
        <th>Overall Away</th>
      </tr>
    </thead>
    <tbody>`;
  teams.forEach(team => {
    // Save team id mapping for later use in players table.
    teamsMap[team.id] = team.name;
    html += `<tr>
      <td>${team.name}</td>
      <td>${team.strength}</td>
      <td>${team.strength_overall_home}</td>
      <td>${team.strength_overall_away}</td>
    </tr>`;
  });
  html += `</tbody></table>`;
  teamsTableContainer.innerHTML = html;
}

// Function to render players table (showing only the first 20 players for brevity)
function renderPlayersTable(players) {
  let html = `<table>
    <thead>
      <tr>
        <th>Player Name</th>
        <th>Team</th>
        <th>Now Cost</th>
        <th>Total Points</th>
      </tr>
    </thead>
    <tbody>`;
  // For demo purposes, only take the first 20 players.
  players.slice(0, 20).forEach(player => {
    const teamName = teamsMap[player.team] || "Unknown";
    html += `<tr>
      <td>${player.web_name}</td>
      <td>${teamName}</td>
      <td>${player.now_cost / 10}</td>
      <td>${player.total_points}</td>
    </tr>`;
  });
  html += `</tbody></table>`;
  playersTableContainer.innerHTML = html;
}

// Function to load data and render tables
async function loadAndRenderData() {
  loadDataBtn.disabled = true;
  loadDataBtn.textContent = "Loading Data...";
  const data = await fetchFPLData();
  if (data) {
    renderTeamsTable(data.teams);
    renderPlayersTable(data.elements);
    loadDataBtn.textContent = "Data Loaded";
  } else {
    loadDataBtn.textContent = "Load Data (Error)";
  }
}

// Set up event listener for the button
loadDataBtn.addEventListener("click", loadAndRenderData);