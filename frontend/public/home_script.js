document.addEventListener('DOMContentLoaded', () => {
    const allDropdownTogglers = document.querySelectorAll('.nav-item.has-dropdown > .nav-link, .has-sub-dropdown > a');

    allDropdownTogglers.forEach(toggler => {
        toggler.addEventListener('click', (event) => {
            event.preventDefault(); 

            // Determine if it's a top-level or sub-level dropdown
            const isTopLevel = toggler.closest('.nav-item.has-dropdown');
            const isSubLevel = toggler.closest('.has-sub-dropdown');

            const parentLi = isTopLevel || isSubLevel; // Get the immediate parent <li> that contains the dropdown

            if (parentLi) {
                // Toggle the 'active' class on the relevant parent list item
                parentLi.classList.toggle('active');

                // Close other open dropdowns at the same level
                const currentLevelDropdowns = parentLi.parentElement.querySelectorAll('.has-dropdown.active, .has-sub-dropdown.active');
                currentLevelDropdowns.forEach(otherParentLi => {
                    if (otherParentLi !== parentLi) {
                        otherParentLi.classList.remove('active');
                        // Also close any nested active dropdowns within the closed one
                        otherParentLi.querySelectorAll('.active').forEach(nestedActive => {
                            nestedActive.classList.remove('active');
                        });
                    }
                });
            }
        });
    });

    // Close all dropdowns if clicked outside the main navigation
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.main-nav')) {
            document.querySelectorAll('.nav-item.active, .has-sub-dropdown.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});


// Log out
    document.querySelectorAll('.dropdown-menu a, .sub-dropdown-menu a').forEach(link => {
        // Check if the link's href is 'detail_page.html' or 'logout' before attaching the event
        if (link.href.includes('detail_page.html') || link.textContent.trim() === 'Log Out') { // ADDED 'Log Out' condition
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link navigation for all handled links

                if (link.textContent.trim() === 'Log Out') {
                    // --- LOGOUT LOGIC --- NEW
                    console.log("Logging out...");
                    // 1. Clear any stored user data (e.g., tokens, user info)
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('currentUser');
                    
                    // Assuming your main home page is index.html or you have a dedicated login page
                    window.location.href = 'index.html';
                } else {
                    // ORIGINAL DETAIL PAGE LOGIC
                    // Determine main and sub categories from the menu structure
                    let mainCategory = '';
                    let subCategory = '';

                    // Find the main dropdown parent (e.g., "අමාත්‍යාංශය")
                    const mainDropdown = link.closest('.nav-item.has-dropdown');
                    if (mainDropdown) {
                        mainCategory = mainDropdown.querySelector('.nav-link').textContent.replace(/[\u200B-\u200D\uFEFF]/g, '').trim().split(' ')[0];
                    }

                    // Find the sub-dropdown parent if applicable (e.g., "ආරක්ෂක අමාත්‍යාංශය")
                    const subDropdown = link.closest('.has-sub-dropdown');
                    if (subDropdown) {
                        subCategory = subDropdown.querySelector('a').textContent.replace(/[\u200B-\u200D\uFEFF]/g, '').trim().split(' ')[0];
                    } else {
                        subCategory = link.textContent.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
                    }

                    // Encode components for URL safety
                    const targetUrl = `detail_page.html?main=${encodeURIComponent(mainCategory)}&sub=${encodeURIComponent(subCategory)}`;
                    
                    // Navigate
                    window.location.href = targetUrl;
                }
            });
        }
    });

    
