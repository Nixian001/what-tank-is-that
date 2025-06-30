document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

///
/// SORTING AND DISPLAYING
///

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
    table.id = "data-table";

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const keyList = Array.from(allKeys);
    keyList.forEach((key, idx) => {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        th.setAttribute('onclick', `sortTable(${idx})`);
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
            
            if (isNaN(parseInt(entry[key])) || String(entry[key]).includes("-")) {
                cell.textContent = entry[key] ?? '';
            }
            else {
                cell.textContent = Number(entry[key]).toLocaleString("en-GB") ?? ""; // Show empty if key doesn't exist
            }

            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    dataContainer.appendChild(table);
}

// Code from W3Schools
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount, equal = 0;
    table = document.getElementById("data-table")
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        equal = 0;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (!isNaN(parseInt(x.innerHTML)) && !isNaN(parseInt(y.innerHTML))
            && !x.innerHTML.toLowerCase().includes("-") && !y.innerHTML.toLowerCase().includes("-")) {
                let nx = x.innerHTML;
                let ny = y.innerHTML;

                nx = nx.replaceAll(",", "");
                ny = ny.replaceAll(",", "");
                
                nx = parseInt(nx);
                ny = parseInt(ny);

                if (dir == "asc") {
                    if (nx > ny) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (nx < ny) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            else {
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        }
    }
}

///
/// QUERYING
///

document.getElementById("search-button").addEventListener("click", search);

function search() {
    console.log("Searching...");
}