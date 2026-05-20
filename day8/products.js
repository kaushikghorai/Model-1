document.addEventListener('DOMContentLoaded', () => {
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');
    const resultsText = document.querySelector('.products-header p');

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const titleElement = card.querySelector('h3');
                if (titleElement) {
                    const title = titleElement.textContent.toLowerCase();
                    if (title.includes(searchTerm)) {
                        card.style.display = 'flex';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                }
            });

            // Update the results count text
            if (resultsText) {
                resultsText.textContent = `Showing ${visibleCount} result${visibleCount !== 1 ? 's' : ''}`;
            }
            
            // Add a subtle animation to the button to indicate action
            applyFiltersBtn.textContent = 'Filters Applied ✓';
            setTimeout(() => {
                applyFiltersBtn.textContent = 'Apply Filters';
            }, 2000);
        });
    }

    // Load More Logic
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hiddenProducts = document.querySelectorAll('.hidden-product');
    
    if (loadMoreBtn && hiddenProducts.length > 0) {
        loadMoreBtn.addEventListener('click', () => {
            // Show loading state
            loadMoreBtn.textContent = 'Loading...';
            loadMoreBtn.style.opacity = '0.7';

            setTimeout(() => {
                hiddenProducts.forEach(product => {
                    product.style.display = 'flex';
                    // Trigger reflow for animation
                    product.getBoundingClientRect(); 
                    product.classList.remove('hidden-product');
                    
                    // Add a fade in animation inline
                    product.animate([
                        { opacity: 0, transform: 'translateY(20px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ], {
                        duration: 500,
                        easing: 'ease-out'
                    });
                });

                // Update results count
                if (resultsText) {
                    const totalVisible = document.querySelectorAll('.product-card[style="display: flex;"]').length 
                                       + document.querySelectorAll('.product-card:not([style*="display: none"])').length;
                    resultsText.textContent = `Showing ${totalVisible} results`;
                }

                // Hide button since all are loaded
                loadMoreBtn.style.display = 'none';
            }, 800); // Simulate network delay
        });
    }
});
