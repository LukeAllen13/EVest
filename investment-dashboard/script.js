const stocks = [
  { symbol: 'AAPL', name: 'Apple', sector: 'Tech', exchange: 'NASDAQ' },
  { symbol: 'MSFT', name: 'Microsoft', sector: 'Tech', exchange: 'NASDAQ' },
  { symbol: 'GOOGL', name: 'Alphabet', sector: 'Tech', exchange: 'NASDAQ' },
  { symbol: 'TSLA', name: 'Tesla', sector: 'Auto', exchange: 'NASDAQ' },
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Finance', exchange: 'NYSE' },
  { symbol: 'AMZN', name: 'Amazon', sector: 'Tech/E-Commerce', exchange: 'NASDAQ' },
  { symbol: 'META', name: 'Meta Platforms', sector: 'Tech/Social', exchange: 'NASDAQ' },
  { symbol: 'NVDA', name: 'Nvidia', sector: 'Tech/Semiconductors', exchange: 'NASDAQ' },
  { symbol: 'ADBE', name: 'Adobe', sector: 'Tech/Software', exchange: 'NASDAQ' },
  { symbol: 'BAC', name: 'Bank of America', sector: 'Finance', exchange: 'NYSE' },
  { symbol: 'WFC', name: 'Wells Fargo', sector: 'Finance', exchange: 'NYSE' },
  { symbol: 'GS', name: 'Goldman Sachs', sector: 'Finance', exchange: 'NYSE' },
  { symbol: 'GM', name: 'General Motors', sector: 'Auto', exchange: 'NYSE' },
  { symbol: 'F', name: 'Ford', sector: 'Auto', exchange: 'NYSE' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', exchange: 'NYSE' },
  { symbol: 'PFE', name: 'Pfizer', sector: 'Healthcare', exchange: 'NYSE' },
  { symbol: 'MRK', name: 'Merck', sector: 'Healthcare', exchange: 'NYSE' },
  { symbol: 'XOM', name: 'ExxonMobil', sector: 'Energy', exchange: 'NYSE' },
  { symbol: 'KO', name: 'Coca-Cola', sector: 'Consumer Goods', exchange: 'NYSE' },
  { symbol: 'PG', name: 'Procter & Gamble', sector: 'Consumer Goods', exchange: 'NYSE' }
];

const tableBody = document.getElementById('stock-table');

stocks.forEach((stock, i) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${stock.sector}</td>
    <td>${stock.name} (${stock.symbol})</td>
    <td><div id="widget_${i}" style="width: 350px; height: 220px;"></div></td>
  `;
  tableBody.appendChild(row);

  const widgetContainer = document.getElementById(`widget_${i}`);
  const widgetScript = document.createElement('script');
  widgetScript.type = 'text/javascript';
  widgetScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
  widgetScript.async = true;
  widgetScript.text = `
{
  "symbol": "${stock.exchange}:${stock.symbol}",
  "width": "350",
  "height": "220",
  "locale": "en",
  "dateRange": "1D",
  "colorTheme": "light",
  "trendLineColor": "rgba(41, 98, 255, 1)",
  "underLineColor": "rgba(41, 98, 255, 0.3)",
  "isTransparent": false,
  "autosize": false
}
  `;
  widgetContainer.appendChild(widgetScript);
});

// Toggle functionality for the dashboard.
const toggleDashboardBtn = document.getElementById("toggle-dashboard");
toggleDashboardBtn.addEventListener("click", () => {
  const dashboardContainer = document.getElementById("dashboard-container");
  if (dashboardContainer.style.display === "none" || dashboardContainer.style.display === "") {
    dashboardContainer.style.display = "block";
    toggleDashboardBtn.textContent = "Collapse Dashboard";
  } else {
    dashboardContainer.style.display = "none";
    toggleDashboardBtn.textContent = "View Dashboard";
  }
});