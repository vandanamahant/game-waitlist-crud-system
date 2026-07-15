document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlist-form');
    const nameInput = document.getElementById('player-name');
    const gameInput = document.getElementById('game-name');
    const playerIdInput = document.getElementById('player-id');
    const nameError = document.getElementById('name-error');
    const gameError = document.getElementById('game-error');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const tableContainer = document.getElementById('table-container');
    const loadingIndicator = document.getElementById('loading-indicator');

    const API_URL = '/waitlist';

    // 1. Fetch and render data
    async function fetchWaitlist() {
        showLoading(true);
        try {
            const response = await fetch(API_URL);
            const resData = await response.json();

            if (resData.success) {
                renderWaitlist(resData.data);
            }
        } catch (error) {
            console.error('Error fetching waitlist:', error);
        } finally {
            showLoading(false);
        }
    }

    // 2. Render Waitlist UI (Handles Empty States)
    function renderWaitlist(list) {
        if (!list || list.length === 0) {
            tableContainer.innerHTML = `<div class="no-data-msg">No data found</div>`;
            return;
        }

        let tableHtml = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Player Name</th>
                        <th>Game Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        list.forEach(item => {
            tableHtml += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.game}</td>
                    <td>
                        <button class="action-btn edit" data-id="${item.id}" data-name="${item.name}" data-game="${item.game}" aria-label="Edit entry for ${item.name}">Edit</button>
                        <button class="action-btn delete" data-id="${item.id}" aria-label="Delete entry for ${item.name}">Delete</button>
                    </td>
                </tr>
            `;
        });

        tableHtml += `</tbody></table>`;
        tableContainer.innerHTML = tableHtml;

        // Attach Event Listeners to actions
        document.querySelectorAll('.action-btn.edit').forEach(btn => {
            btn.addEventListener('click', handleEditClick);
        });

        document.querySelectorAll('.action-btn.delete').forEach(btn => {
            btn.addEventListener('click', handleDeleteClick);
        });
    }

    // 3. Form Validation (Highlights fields in Red on error)
    function validateForm() {
        let isValid = true;

        if (!nameInput.value.trim()) {
            nameInput.classList.add('invalid');
            nameError.textContent = 'Name is required.';
            isValid = false;
        } else {
            nameInput.classList.remove('invalid');
            nameError.textContent = '';
        }

        if (!gameInput.value.trim()) {
            gameInput.classList.add('invalid');
            gameError.textContent = 'Game is required.';
            isValid = false;
        } else {
            gameInput.classList.remove('invalid');
            gameError.textContent = '';
        }

        return isValid;
    }

    // Reset input states
    function clearFormErrors() {
        nameInput.classList.remove('invalid');
        gameInput.classList.remove('invalid');
        nameError.textContent = '';
        gameError.textContent = '';
    }

    // 4. Form Submission (Add/Update)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearFormErrors();

        if (!validateForm()) return;

        const id = playerIdInput.value;
        const payload = {
            name: nameInput.value,
            game: gameInput.value
        };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;

        showLoading(true);

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Telemetry Ping
                console.log('[Analytics] User interacted with Game Waitlist CRUD API with Route Parameters');
                resetForm();
                fetchWaitlist();
            }
        } catch (error) {
            console.error('Error saving waitlist entry:', error);
        } finally {
            showLoading(false);
        }
    });

    // 5. Handling Edit Mode
    function handleEditClick(e) {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const game = e.target.getAttribute('data-game');

        playerIdInput.value = id;
        nameInput.value = name;
        gameInput.value = game;

        document.getElementById('form-title').textContent = 'Update Player Details';
        submitBtn.textContent = 'Update Player';
        cancelBtn.classList.remove('hidden');
        clearFormErrors();
    }

    // 6. Handling Delete
    async function handleDeleteClick(e) {
        const id = e.target.getAttribute('data-id');
        if (!confirm('Are you sure you want to remove this player?')) return;

        showLoading(true);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('[Analytics] User interacted with Game Waitlist CRUD API with Route Parameters');
                fetchWaitlist();
            }
        } catch (error) {
            console.error('Error deleting waitlist entry:', error);
        } finally {
            showLoading(false);
        }
    }

    // UI States helpers
    function resetForm() {
        playerIdInput.value = '';
        form.reset();
        document.getElementById('form-title').textContent = 'Add Player to Waitlist';
        submitBtn.textContent = 'Add Player';
        cancelBtn.classList.add('hidden');
        clearFormErrors();
    }

    function showLoading(state) {
        if (state) {
            loadingIndicator.classList.remove('hidden');
        } else {
            loadingIndicator.classList.add('hidden');
        }
    }

    cancelBtn.addEventListener('click', resetForm);

    // Initial load
    fetchWaitlist();
});