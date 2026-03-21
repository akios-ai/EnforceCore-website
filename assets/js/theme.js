// Theme Toggle Logic
(function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIconSun = document.getElementById('theme-icon-sun');
    const themeIconMoon = document.getElementById('theme-icon-moon');
    const htmlElement = document.documentElement;

    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    // Default to dark if no preference
    let currentTheme = savedTheme || 'dark'; // Force dark as default per design system
    
    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            themeIconSun.style.display = 'none';
            themeIconMoon.style.display = 'block';
        } else {
            themeIconSun.style.display = 'block';
            themeIconMoon.style.display = 'none';
        }
        
        // Update Mermaid diagrams if present
        if (typeof mermaid !== 'undefined') {
            // Reload page to re-render mermaid with correct theme? 
            // Mermaid is tricky to re-render dynamically without clear API. 
            // For now, we rely on page reload or accept initial render.
            // But we can try to re-initialize if we haven't rendered yet.
        }
    }

    // Initial Apply
    applyTheme(currentTheme);

    // Event Listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(currentTheme);
        });
    }
})();
