document.addEventListener('DOMContentLoaded', () => {
    //  Dynamic Title Logic
    const dynamicTitleElement = document.getElementById('dynamicTitle');

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const mainCategory = getUrlParameter('main');
    const subCategory = getUrlParameter('sub');

    if (dynamicTitleElement) {
        if (mainCategory && subCategory) {
            dynamicTitleElement.textContent = `${mainCategory} - ${subCategory}`;
        } else if (mainCategory) {
            dynamicTitleElement.textContent = mainCategory;
        } else {
            dynamicTitleElement.textContent = 'අමාත්‍යාංශය ';
        }
    }

    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentAccordionItem = header.closest('.accordion-item');
            const content = currentAccordionItem.querySelector('.accordion-content');
            const arrow = header.querySelector('.accordion-arrow');

            // Toggle 'active' class on header
            header.classList.toggle('active');
            // Toggle 'open' class on content
            content.classList.toggle('open');

            // Update arrow icon based on 'active' state
            if (header.classList.contains('active')) {
                arrow.classList.remove('fa-caret-down');
                arrow.classList.add('fa-caret-up');
            } else {
                arrow.classList.remove('fa-caret-up');
                arrow.classList.add('fa-caret-down');
            }

            // Optional: Close other open accordion items (one at a time behavior)
            accordionHeaders.forEach(otherHeader => {
                const otherAccordionItem = otherHeader.closest('.accordion-item');
                if (otherAccordionItem !== currentAccordionItem) {
                    const otherContent = otherAccordionItem.querySelector('.accordion-content');
                    const otherArrow = otherHeader.querySelector('.accordion-arrow');

                    if (otherHeader.classList.contains('active')) {
                        otherHeader.classList.remove('active');
                        otherContent.classList.remove('open');
                        otherArrow.classList.remove('fa-caret-up');
                        otherArrow.classList.add('fa-caret-down');
                    }
                }
            });
        });
    });

    // File Upload Interaction 
    const scanCopyInput = document.getElementById('scanCopy');
    const customFileBrowseBtn = document.querySelector('.custom-file-browse-btn');
    const scanCopyFileNameDisplay = document.getElementById('scanCopyFileName');

    if (customFileBrowseBtn && scanCopyInput && scanCopyFileNameDisplay) {
        customFileBrowseBtn.addEventListener('click', () => {
            scanCopyInput.click();
        });

        scanCopyInput.addEventListener('change', () => {
            if (scanCopyInput.files.length > 0) {
                scanCopyFileNameDisplay.textContent = scanCopyInput.files[0].name;
            } else {
                scanCopyFileNameDisplay.textContent = 'No file chosen';
            }
        });
    }

    // NEW: General File Input Handling
    // This ensures all file input browse buttons work correctly
    document.querySelectorAll('.custom-file-browse-btn').forEach(button => {
        button.addEventListener('click', function() {
            const hiddenFileInput = this.previousElementSibling; // Assuming input is immediately before
            hiddenFileInput.click();
        });
    });

    document.querySelectorAll('.hidden-file-input').forEach(input => {
        input.addEventListener('change', function() {
            const fileNameDisplay = this.nextElementSibling.nextElementSibling; // Adjust based on your HTML structure
            if (fileNameDisplay) {
                if (this.files.length > 0) {
                    fileNameDisplay.textContent = this.files[0].name;
                } else {
                    fileNameDisplay.textContent = 'No file chosen';
                }
            }
        });
    });


    // --- Thanathuru Details Form and Table Functionality ---
    const thanathuruDetailsFormContainer = document.getElementById('thanathuruDetailsFormContainer');
    const thanathuruVistaraInput = document.getElementById('thanathuruVistaraInput');
    const closeDetailFormBtn = document.querySelector('.close-detail-form-btn');
    const addThanathuruRowBtn = document.getElementById('addThanathuruRow');
    const thanathuruTableBody = thanathuruDetailsFormContainer ? thanathuruDetailsFormContainer.querySelector('.table-container tbody') : null;
    const saveThanathuruDetailsBtn = document.getElementById('saveThanathuruDetails');

    // Assuming a similar structure for Kamitu Wartha if it exists
    const kamituWarthaTableBody = document.getElementById('kamituWarthaTableBody'); 
    // Track serial number for Thanathuru table
    let thanathuruSerialNumber = 0;

    // Function to show the detailed "තනතුරු විස්තර" form
    function showThanathuruDetailsForm() {
        if (thanathuruDetailsFormContainer) {
            thanathuruDetailsFormContainer.style.display = 'block';
            thanathuruDetailsFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Add an initial row if the table is empty
            if (thanathuruTableBody && thanathuruTableBody.children.length === 0) {
                addThanathuruRecord('thanathuru');
            }
        }
    }

    // Function to hide the detailed "තනතුරු විස්තර" form
    function hideThanathuruDetailsForm() {
        if (thanathuruDetailsFormContainer) {
            thanathuruDetailsFormContainer.style.display = 'none';
        }
    }

    // Event listener for clicking the "තනතුරු විස්තර" input (Option 5)
    if (thanathuruVistaraInput) {
        thanathuruVistaraInput.addEventListener('click', showThanathuruDetailsForm);
    }

    // Event listener for the close button on the detailed form
    if (closeDetailFormBtn) {
        closeDetailFormBtn.addEventListener('click', hideThanathuruDetailsForm);
    }

    // NEW: Function to add a new record to a specified table
    // 'type' can be 'thanathuru' or 'kamitu'
    function addRecordToTable(type) {
        let tableBody;
        let serialNum;
        let newRowHtml = '';
        let numInputColumns; // Number of input columns to add

        if (type === 'thanathuru') {
            tableBody = thanathuruTableBody;
            thanathuruSerialNumber++;
            serialNum = thanathuruSerialNumber;
            numInputColumns = 5; 
        } else if (type === 'kamitu') {
            tableBody = kamituWarthaTableBody;
        
            serialNum = tableBody ? tableBody.children.length + 1 : 1; 
            numInputColumns = 8;
        }

        if (!tableBody) {
            console.error(`Table body for type '${type}' not found.`);
            return;
        }

        // Start new row with serial number
        newRowHtml += `<td>${serialNum}</td>`;

        // Add input columns
        for (let i = 0; i < numInputColumns; i++) {
            newRowHtml += `<td><input type="text"></td>`;
        }

    

        const newRow = document.createElement('tr');
        newRow.innerHTML = newRowHtml;
        tableBody.appendChild(newRow);

        // Attach event listeners for the new row's action icons
        const editIcon = newRow.querySelector('.edit-icon');
        const deleteIcon = newRow.querySelector('.delete-icon');

        if (editIcon) {
            editIcon.addEventListener('click', (event) => {
                // Find the parent <tr> and enable editing its inputs
                const rowToEdit = event.target.closest('tr');
                if (rowToEdit) {
                    rowToEdit.querySelectorAll('input[type="text"]').forEach(input => {
                        input.removeAttribute('readonly'); 
                        input.style.border = '1px solid #ccc'; 
                    });
                    alert('Row is now editable. Click Save to confirm changes.');
                }
            });
        }

        if (deleteIcon) {
            deleteIcon.addEventListener('click', (event) => {
                if (confirm('Are you sure you want to delete this record?')) {
                    const rowToDelete = event.target.closest('tr');
                    if (rowToDelete) {
                        rowToDelete.remove();
                        // Optional: Re-sequence serial numbers after deletion
                        updateTableSerialNumbers(type);
                    }
                }
            });
        }
    }

    // NEW: Function to update serial numbers after deletion for a specific table
    function updateTableSerialNumbers(type) {
        let tableBody;
        if (type === 'thanathuru') {
            tableBody = thanathuruTableBody;
            thanathuruSerialNumber = 0; // Reset counter for re-sequencing
        } else if (type === 'kamitu') {
            tableBody = kamituWarthaTableBody;
            // Reset Kamitu counter here if it has one
        }

        if (tableBody) {
            Array.from(tableBody.children).forEach((row, index) => {
                row.cells[0].textContent = index + 1; // Update serial number
                if (type === 'thanathuru') {
                    thanathuruSerialNumber = index + 1; // Update global counter
                }
                // Update Kamitu counter if applicable
            });
        }
    }


    // Event listener for the "Add" button in the Thanathuru Details form
    if (addThanathuruRowBtn) {
        addThanathuruRowBtn.addEventListener('click', () => {
            add
        });
    }


    // Save button (for the whole form, including table data)
    if (saveThanathuruDetailsBtn) {
        saveThanathuruDetailsBtn.addEventListener('click', function() {
            alert('Saving Thanathuru Details... (Check console for data)');
            const formData = {};

            // Get data from individual form fields
            const formFields = document.querySelectorAll('.staff-info-form input[type="text"], .staff-info-form select');
            formFields.forEach(field => {
                formData[field.id || field.name] = field.value; 
            });

            // Get data from Thanathuru table rows
            const thanathuruTableData = [];
            if (thanathuruTableBody) {
                thanathuruTableBody.querySelectorAll('tr').forEach(row => {
                    const rowData = [];
                    row.querySelectorAll('td').forEach((cell, index) => {
                        const input = cell.querySelector('input[type="text"]');
                        if (input) {
                            rowData.push(input.value);
                            // After saving, make inputs readonly to represent "saved" state
                            input.setAttribute('readonly', 'readonly');
                            input.style.border = 'none'; 
                        } else if (index !== row.cells.length - 1) { // Exclude last cell (actions)
                            rowData.push(cell.textContent.trim());
                        }
                    });
                    thanathuruTableData.push(rowData);
                });
            }
            formData.thanathuruTable = thanathuruTableData;

            console.log('Form Data (including table):', formData);
           
        });
    }


    // Event listeners for general header icons (Print, PDF)
    const printIcon = document.querySelector('.header-icons .fa-print'); 
    const pdfIcon = document.querySelector('.header-icons .fa-file-pdf'); 

    if (printIcon) {
        printIcon.addEventListener('click', () => {
            window.print(); 
        });
    }

    if (pdfIcon) {
        pdfIcon.addEventListener('click', () => {
            alert('Accessing PDF... (In a real app, this would trigger a download or display)');
            
        });
    }

   
    document.querySelectorAll('.event-actions .edit-icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            const eventCard = event.target.closest('.event-card');
            if (eventCard) {
                alert('Edit event card clicked! (Implement specific edit logic for this card)');
                console.log('Event Card to edit:', eventCard);
                
            }
        });
    });

    document.querySelectorAll('.event-actions .delete-icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            if (confirm('Are you sure you want to delete this event card?')) {
                const eventCard = event.target.closest('.event-card');
                if (eventCard) {
                    eventCard.remove();
                    alert('Event card deleted!');
                }
            }
        });
    });


    const headerSaveIcon = document.querySelector('.header-icons .fa-save');
    if (headerSaveIcon) {
        headerSaveIcon.addEventListener('click', () => {
            
        });
    }
});

