let selectedRow = null;

function generateTable() {
  const table = document.getElementById("numberTable");
  for (let i = 0; i < 5; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("td");
      cell.textContent = Math.floor(Math.random() * 100);
      row.appendChild(cell);
    }
    row.addEventListener("click", () => {
      selectRow(row);
    });
    table.querySelector("tbody").appendChild(row);
  }
}

function selectRow(row) {
  if (selectedRow) {
    selectedRow.classList.remove("selected");
  }
  selectedRow = row;
  selectedRow.classList.add("selected");

  const data = Array.from(row.children).map(cell => Number(cell.textContent));
  drawChart(data);
}

function drawChart(data) {
  const ctx = document.getElementById("lineChart").getContext("2d");
  if (window.chartInstance) {
    window.chartInstance.destroy();
  }
  window.chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["1", "2", "3", "4", "5"],
      datasets: [{
        label: "Kiválasztott sor értékei",
        data: data,
        borderColor: "blue",
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", generateTable);
