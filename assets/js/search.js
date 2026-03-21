(function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  let searchIndex = [];

  // Load Search Index
  // We use relative path logic or assume root
  // Since this script is loaded in header, we can try to detect root
  // But usually /search.json works if served from root
  // We'll try to find the correct path based on script tag or location
  
  // Simple heuristic: fetch from root
  const root = document.documentElement.getAttribute('data-root') || '';
  
  async function loadIndex() {
    try {
      const res = await fetch(root + '/search.json');
      if (!res.ok) throw new Error('Failed to load search index');
      searchIndex = await res.json();
    } catch (e) {
      console.error(e);
    }
  }

  // Initial load
  loadIndex();

  if (!searchInput || !searchResults) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
      searchResults.classList.remove('active');
      return;
    }

    const results = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(query) || 
             item.content.toLowerCase().includes(query);
    }).slice(0, 6); // Limit to 6 results

    renderResults(results, query);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.length >= 2) {
      searchResults.classList.add('active');
    }
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });

  function renderResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">No results found</div>';
    } else {
      searchResults.innerHTML = results.map(item => {
        // Highlight logic could go here
        return `
          <a href="${root}${item.url}" class="search-item">
            <span class="search-item-title">${item.title}</span>
            <span class="search-item-snippet">${item.content.substring(0, 100)}...</span>
          </a>
        `;
      }).join('');
    }
    searchResults.classList.add('active');
  }
})();
