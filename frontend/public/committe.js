document.addEventListener('DOMContentLoaded', function() {
    const dataCardList = document.getElementById('dataCardList');
    // const navItems = document.querySelectorAll('.nav-item.has-dropdown'); // No longer used for adding new

    // New elements for the form
    const addNewOptionBtn = document.getElementById('addNewOptionBtn');
    const dataCardFormContainer = document.getElementById('dataCardFormContainer');
    const formMainCategory = document.getElementById('formMainCategory');
    const formSubCategory = document.getElementById('formSubCategory');
    const saveDataCardBtn = document.getElementById('saveDataCardBtn');
    const cancelDataCardBtn = document.getElementById('cancelDataCardBtn');

    let editingDataCardId = null;

     document.querySelectorAll('.dropdown-menu a, .sub-dropdown-menu a').forEach(link => {
         if (link.href.includes('detail_page.html') || link.textContent.trim() === 'Log Out') {
             link.addEventListener('click', function(event) {
                 event.preventDefault();

                if (link.textContent.trim() === 'Log Out') {
                    console.log("Logging out...");
                    window.location.href = 'index.html';
                } else {
                    let mainCategory = '';
                    let subCategory = '';

                    const mainDropdown = link.closest('.nav-item.has-dropdown');
                    if (mainDropdown) {
                        mainCategory = mainDropdown.querySelector('.nav-link').textContent.replace(/[\u200B-\u200D\uFEFF]/g, '').trim().split(' ')[0];
                    }

                    const subDropdown = link.closest('.has-sub-dropdown');
                    if (subDropdown) {
                        subCategory = link.textContent.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
                    } else {
                        subCategory = link.textContent.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
                    }

                    // This now navigates to detail_page for a new *main form* entry
                    const targetUrl = `detail_page.html?main=${encodeURIComponent(mainCategory)}&sub=${encodeURIComponent(subCategory)}&action=new`;
                   window.location.href = targetUrl;
                }
           });
        }
    });


    // --- MODIFIED: Load and display saved data cards from Backend API ---
    async function loadDataCards() {
        dataCardList.innerHTML = ''; // Clear existing dummy cards

        try {
            const response = await fetch('http://localhost:3000/api/form-data'); // Replace with your backend URL
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const savedData = await response.json();

            if (savedData.length === 0) {
                dataCardList.innerHTML = '<p style="text-align: center; color: #555;">No saved data yet. Click "Add New Committee/Category" to add an entry.</p>';
                return;
            }

            savedData.forEach(data => {
                const dataCard = document.createElement('div');
                dataCard.classList.add('data-card');
                dataCard.dataset.id = data.id; // Store the backend-generated ID

                const ministry = data.mainCategory || 'N/A';
                const institution = data.subCategory || 'N/A';
                // Assuming appliedAmount or similar field might be a unique identifier for the card
                const identifier = data.appliedAmount ? `/ ${data.appliedAmount}` : '';
                const rrpcDate = data.rrpcDate ? `/ ${data.rrpcDate}` : '';

                dataCard.innerHTML = `
                    ${ministry} / ${institution} ${identifier} ${rrpcDate}
                    <div class="card-actions">
                        <button class="edit-card-btn" data-id="${data.id}"><i class="fas fa-edit"></i> Edit Committee</button>
                        <button class="delete-card-btn" data-id="${data.id}"><i class="fas fa-trash"></i> Delete Committee</button>
                    </div>
                `;

                dataCard.querySelector('.edit-card-btn').addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent card click event
                    editDataCard(data.id);
                });

                dataCard.querySelector('.delete-card-btn').addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent card click event
                    deleteDataCard(data.id);
                });

                dataCard.addEventListener('click', function() {
                    // When a data card is clicked, navigate to the decisions page for this committee
                    // Make sure 'committe.js' (decisions_script.js from previous answer) is loaded on decisions_page.html
                    window.location.href = `committe_page.html?formEntryId=${dataCard.dataset.id}`;
                });

                dataCardList.appendChild(dataCard);
            });
        } catch (error) {
            console.error("Error loading data cards:", error);
            dataCardList.innerHTML = '<p style="text-align: center; color: red;">Failed to load data. Please check backend connection.</p>';
        }
    }

    // Call loadDataCards when the home page loads
    loadDataCards();

    // --- New: Add Option Button and Form Logic ---
    addNewOptionBtn.addEventListener('click', () => {
        resetDataCardForm();
        dataCardFormContainer.classList.remove('hidden-form');
        addNewOptionBtn.style.display = 'none'; // Hide the add button
    });

    cancelDataCardBtn.addEventListener('click', () => {
        dataCardFormContainer.classList.add('hidden-form');
        addNewOptionBtn.style.display = 'block'; // Show the add button
        resetDataCardForm();
    });

    function resetDataCardForm() {
        editingDataCardId = null;
        formMainCategory.value = '';
        formSubCategory.value = '';
    }

    async function editDataCard(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/form-data/${id}`);
            if (!response.ok) throw new Error('Failed to fetch committee for editing.');
            const dataCard = await response.json();

            editingDataCardId = id;
            formMainCategory.value = dataCard.mainCategory || '';
            formSubCategory.value = dataCard.subCategory || '';

            dataCardFormContainer.classList.remove('hidden-form');
            addNewOptionBtn.style.display = 'none';
        } catch (error) {
            console.error('Error loading data card for edit:', error);
            alert('Failed to load committee details for editing.');
        }
    }

    async function deleteDataCard(id) {
        if (!confirm('Are you sure you want to delete this committee and all its associated decisions?')) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/form-data/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete committee.');
            alert('Committee deleted successfully!');
            loadDataCards(); // Reload list after deletion
        } catch (error) {
            console.error('Error deleting committee:', error);
            alert(`Error deleting committee: ${error.message}`);
        }
    }


    saveDataCardBtn.addEventListener('click', async () => {
        const dataCardData = {
            mainCategory: formMainCategory.value,
            subCategory: formSubCategory.value,
            // You can add default empty values for other fields if your DB requires them
            rrpcDate: '',
            applyDate: '',
            appliedAmount: '',
            duty: '',
            thanathuruVistaraInput: '',
            authority: '',
            maritalStatus: '',
            scanCopyFileName: '',
            thanathuruDetails: null
        };

        let url = 'http://localhost:3000/api/form-data';
        let method = 'POST';

        if (editingDataCardId) {
            url = `http://localhost:3000/api/form-data/${editingDataCardId}`;
            method = 'PUT';
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataCardData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Server error: ${response.status} - ${errorData.message}`);
            }

            alert(editingDataCardId ? 'Committee updated successfully!' : 'New Committee added successfully!');
            dataCardFormContainer.classList.add('hidden-form');
            addNewOptionBtn.style.display = 'block';
            loadDataCards(); // Reload the list to show the new/updated card
        } catch (error) {
            console.error('Error saving data card:', error);
            alert(`Failed to save committee: ${error.message}. Please check console for details.`);
        }
    });

});