// script.js
const ctx = document.getElementById('investmentChart').getContext('2d');

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [{
    label: 'Tech Stocks ($)',
    data: [1200, 1500, 1350, 1600],
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 2,
    fill: false
  }]
};

new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});