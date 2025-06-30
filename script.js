document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    fetch('./tank-data.json')
    .then(response => response.json())
    .then(data => {
        displayData(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function displayData(data) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    const entries = Object.values(data); // Handles object-based JSON

    if (entries.length === 0) {
        dataContainer.textContent = 'No data available.';
        return;
    }

    // Get all unique keys (columns) from all entries
    const allKeys = new Set();
    entries.forEach(entry => {
        Object.keys(entry).forEach(key => allKeys.add(key));
    });

    const table = document.createElement('table');
    table.classList.add('data-table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    allKeys.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    entries.forEach(entry => {
        const row = document.createElement('tr');
        allKeys.forEach(key => {
            const cell = document.createElement('td');
            cell.textContent = entry[key] ?? ''; // Show empty if key doesn't exist
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    dataContainer.appendChild(table);
}