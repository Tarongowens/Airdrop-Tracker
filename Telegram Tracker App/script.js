// Function to show a tab
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.add('hidden');
    });
    document.getElementById(tabName).classList.remove('hidden');
}



// Function to update currently farming and not farming tables based on checkbox state
function updateTables() {
    const opportunityRows = document.querySelectorAll('#opportunity-table-body tr');
    const currentlyFarmingBody = document.getElementById('currently-farming-body');
    const notFarmingBody = document.getElementById('not-farming-body');

    // Clear the current farming and not farming tables
    currentlyFarmingBody.innerHTML = '';
    notFarmingBody.innerHTML = '';

    let state = []; // Array to store the state of checkboxes

    opportunityRows.forEach((row, index) => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const cells = row.querySelectorAll('td');

        // Save the checkbox state in the array
        state.push(checkbox.checked);

        // Create a new row for farming or not farming
        const newRow = document.createElement('tr');
        cells.forEach((cell, i) => {
            if (i > 0) { // Skip the checkbox column
                const newCell = document.createElement('td');
                newCell.innerHTML = cell.innerHTML;
                newRow.appendChild(newCell);
            }
        });

        // Add the row to the appropriate table based on checkbox state
        if (checkbox.checked) {
            currentlyFarmingBody.appendChild(newRow);
        } else {
            notFarmingBody.appendChild(newRow);
        }
    });

    // Save the state array to localStorage
    localStorage.setItem('farmingState', JSON.stringify(state));
}

// Function to load the saved state from localStorage
function loadState() {
    const savedState = JSON.parse(localStorage.getItem('farmingState'));
    if (savedState) {
        const opportunityRows = document.querySelectorAll('#opportunity-table-body tr');
        opportunityRows.forEach((row, index) => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (savedState[index] !== undefined) {
                checkbox.checked = savedState[index]; // Restore the checkbox state
            }
        });
    }
}

        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            // Format the time as HH:MM:SS
            const currentTime = `${hours}:${minutes}:${seconds}`;
            
            // Update the content of the clock div with the new time
            document.getElementById('clock').textContent = currentTime;
        }

        // Call the updateClock function every second
        setInterval(updateClock, 1000);

        // Initialize the clock immediately
        updateClock();
		
		        // Function to convert static UTC time to local time
        function displayLocalTimeFromUTC(hour, minute) {
            // Set a static time in UTC (e.g., 10:00 AM UTC)
            const utcDate = new Date(Date.UTC(2024, 0, 1, hour, minute)); // year, month (0=January), day, hour, minute

            // Convert the UTC date to the user's local time zone using toLocaleString()
            const localTime = utcDate.toLocaleString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false, // Set to true if you want 12-hour format
            });

            // Display the converted time
            document.getElementById('utc-time').textContent = `Local Time: ${localTime}`;
        }

        // Example: Display 10:00 AM UTC converted to the user's local time
        displayLocalTimeFromUTC(10, 0);

// Show the home tab by default on page load and load the saved state
document.addEventListener('DOMContentLoaded', () => {
    showTab('home');
    loadState(); // Load saved state on page load
    updateTables(); // Update tables based on loaded state
});

