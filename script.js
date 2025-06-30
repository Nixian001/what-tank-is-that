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

    data.forEach(item => {
        const dataItem = document.createElement('div');
        dataItem.classList.add('data-item');
        dataItem.textContent = `Name: ${item.name}, Country: ${item.country}, Years Produced: ${item.years}, Tank Type: ${item.type}`;
        dataContainer.appendChild(dataItem);
    });
}