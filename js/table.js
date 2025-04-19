let records = [];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dataForm");
  const searchInput = document.getElementById("searchInput");

  form.addEventListener("submit", addRecord);
  searchInput.addEventListener("input", renderTable);

  document.querySelectorAll("th[data-col]").forEach(th => {
    th.addEventListener("click", () => sortTable(th.dataset.col));
  });

  renderTable();
});

function addRecord(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value.trim());
  const city = document.getElementById("city").value.trim();
  const job = document.getElementById("job").value.trim();

  if (!name || !age || !city || !job) return alert("Minden mező kötelező!");

  records.push({ name, age, city, job });
  e.target.reset();
  renderTable();
}

function deleteRecord(index) {
  if (confirm("Biztosan törlöd ezt a sort?")) {
    records.splice(index, 1);
    renderTable();
  }
}

function editRecord(index) {
  const rec = records[index];
  document.getElementById("name").value = rec.name;
  document.getElementById("age").value = rec.age;
  document.getElementById("city").value = rec.city;
  document.getElementById("job").value = rec.job;

  records.splice(index, 1); // töröljük, újként újra hozzáadjuk
  renderTable();
}

let currentSort = { col: "", asc: true };

function sortTable(col) {
  if (currentSort.col === col) {
    currentSort.asc = !currentSort.asc;
  } else {
    currentSort = { col, asc: true };
  }

  records.sort((a, b) => {
    if (a[col] < b[col]) return currentSort.asc ? -1 : 1;
    if (a[col] > b[col]) return currentSort.asc ? 1 : -1;
    return 0;
  });

  renderTable();
}

function renderTable() {
  const tbody = document.querySelector("#dataTable tbody");
  const filter = document.getElementById("searchInput").value.toLowerCase();

  tbody.innerHTML = "";

  records
    .filter(r => Object.values(r).some(val => val.toString().toLowerCase().includes(filter)))
    .forEach((rec, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${rec.name}</td>
        <td>${rec.age}</td>
        <td>${rec.city}</td>
        <td>${rec.job}</td>
        <td>
          <button onclick="editRecord(${index})">✏️</button>
          <button onclick="deleteRecord(${index})">🗑️</button>
        </td>
      `;
      tbody.appendChild(row);
    });
}
