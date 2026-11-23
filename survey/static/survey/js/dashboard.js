/**
 * Dashboard Analytics & Dynamic Table Search/Filter
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('tableSearchInput');
  const techFilter = document.getElementById('techFilterSelect');
  const tableRows = document.querySelectorAll('.data-table tbody tr.survey-row');
  const emptyStateRow = document.getElementById('emptyStateRow');
  const visibleCountSpan = document.getElementById('visibleCount');

  function filterTable() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedTech = techFilter ? techFilter.value.trim() : 'ALL';

    let matchCount = 0;

    tableRows.forEach((row) => {
      const name = row.dataset.name || '';
      const email = row.dataset.email || '';
      const tech = row.dataset.tech || '';
      const feedback = row.dataset.feedback || '';

      const matchesSearch = !query || 
        name.includes(query) || 
        email.includes(query) || 
        tech.toLowerCase().includes(query) || 
        feedback.includes(query);

      const matchesTech = (selectedTech === 'ALL') || (tech === selectedTech);

      if (matchesSearch && matchesTech) {
        row.style.display = '';
        matchCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (visibleCountSpan) {
      visibleCountSpan.textContent = matchCount;
    }

    if (emptyStateRow) {
      emptyStateRow.style.display = (matchCount === 0) ? '' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterTable);
  }

  if (techFilter) {
    techFilter.addEventListener('change', filterTable);
  }
});
