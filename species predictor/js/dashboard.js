/**
 * AI-Powered Endangered Species Population Predictor
 * Dashboard JavaScript Engine (Core UI Interactions)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Date & Time Welcome Banner
    initDateTime();

    // 2. Theme Toggle Controller (Light/Dark Mode)
    initThemeToggle();

    // 3. Sidebar Toggle for Mobile Devices
    initSidebarMobile();

    // 4. Client-side Table Search Filter
    initTableSearch();

    // 5. Dynamic Notification Simulators
    initNotifications();

    // 6. Action Button Events
    initQuickActions();
});

/**
 * Display the current date beautifully in the welcome header
 */
function initDateTime() {
    const dateContainer = document.getElementById('current-date');
    if (dateContainer) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateContainer.textContent = today.toLocaleDateString('en-US', options);
    }
}

/**
 * Controls theme switching (light mode <-> dark mode)
 */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
    
    // Check local storage for preference, or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeIcon, currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentMode = document.documentElement.getAttribute('data-theme');
            const newMode = currentMode === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newMode);
            localStorage.setItem('theme', newMode);
            updateThemeIcon(themeIcon, newMode);

            // Dispatch custom event to notify Chart.js configuration
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newMode } }));
            
            showToast('Theme Changed', `Switched to ${newMode.toUpperCase()} mode successfully!`, 'info');
        });
    }
}

function updateThemeIcon(iconElement, theme) {
    if (!iconElement) return;
    if (theme === 'dark') {
        iconElement.className = 'fas fa-sun';
    } else {
        iconElement.className = 'fas fa-moon';
    }
}

/**
 * Responsive offcanvas sidebar actions
 */
function initSidebarMobile() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
                sidebar.classList.remove('active');
            }
        });

        // Handle window resize logic
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992) {
                sidebar.classList.remove('active');
            }
        });
    }
}

/**
 * Client-side fuzzy table row filtering based on the search box input
 */
function initTableSearch() {
    const tableSearch = document.getElementById('table-search-input');
    const tableRows = document.querySelectorAll('#high-risk-table tbody tr');

    if (tableSearch) {
        tableSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(query)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Handle notification clicks and fire toast alerts
 */
function initNotifications() {
    const notifBtn = document.getElementById('notification-trigger');
    const notifBadge = document.querySelector('.notification-badge');

    const alerts = [
        "Alert: Black Rhino population projection shows a critical 4% decline next year.",
        "Model Update: Auto-retraining finished with an R² Score of 0.94.",
        "System: Conservation grant database synchronized with IUCN API.",
        "Data Added: Deforestation statistics in Sumatra updated for 2026."
    ];

    if (notifBtn) {
        notifBtn.addEventListener('click', () => {
            // Dismiss badge
            if (notifBadge) {
                notifBadge.style.display = 'none';
            }

            // Pick a random notification
            const randomIndex = Math.floor(Math.random() * alerts.length);
            showToast('Conservation Advisory Alert', alerts[randomIndex], 'warning');
        });
    }
}

/**
 * Action buttons simulation (hover triggers, toast popups)
 */
function initQuickActions() {
    const predictBtn = document.getElementById('action-predict');
    const uploadBtn = document.getElementById('action-upload');
    const reportBtn = document.getElementById('action-report');
    const speciesBtn = document.getElementById('action-species');

    if (predictBtn) {
        predictBtn.addEventListener('click', () => {
            showToast('Simulation Command', 'Predict Population window would open here.', 'success');
        });
    }
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            showToast('Simulation Command', 'Dataset Upload manager dialog would trigger here.', 'info');
        });
    }
    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            showToast('Simulation Command', 'PDF report compilation initialized.', 'success');
        });
    }
    if (speciesBtn) {
        speciesBtn.addEventListener('click', () => {
            showToast('Simulation Command', 'Navigating to Species Catalog.', 'info');
        });
    }

    // Bind Read More buttons on Recommendations
    const readMoreBtns = document.querySelectorAll('.rec-readmore-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const recName = e.target.getAttribute('data-rec-name') || 'Conservation Recommendation';
            showToast(recName, 'A detailed conservation advisory plan is loaded from the policy handbook database.', 'info');
        });
    });

    // Sidebar items visual indicator click logic
    const sidebarLinks = document.querySelectorAll('.menu-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const item = link.closest('.menu-item');
            if (item && !item.classList.contains('active')) {
                document.querySelectorAll('.menu-item').forEach(mi => mi.classList.remove('active'));
                item.classList.add('active');
                
                const label = link.textContent.trim();
                showToast('Navigation Triggered', `Routing to target section: ${label}`, 'info');
            }
        });
    });
}

/**
 * Create and show a beautiful Toast notification programmatically
 */
function showToast(title, message, type = 'info') {
    // Check if toast-container exists, else construct it
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }

    let typeColor = 'var(--accent-blue)';
    if (type === 'success') typeColor = 'var(--accent-emerald)';
    if (type === 'warning') typeColor = 'var(--accent-coral)';
    if (type === 'info') typeColor = 'var(--accent-teal)';

    const toastId = 'toast_' + Date.now();
    const toastHtml = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
            <div class="toast-header" style="border-bottom: 1px solid var(--border-color); background-color: var(--bg-secondary); color: var(--text-primary);">
                <span class="rounded me-2" style="width: 12px; height: 12px; background-color: ${typeColor};"></span>
                <strong class="me-auto font-heading">${title}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" style="background-color: var(--bg-secondary); color: var(--text-secondary);">
                ${message}
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', toastHtml);
    const toastElement = document.getElementById(toastId);
    
    // Initialize with bootstrap
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    // Clean up DOM after hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}
