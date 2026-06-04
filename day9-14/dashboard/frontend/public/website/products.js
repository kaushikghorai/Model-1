document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');

    let allProducts = [];

    // 1. Fetch products from API
    fetch('https://fakestoreapi.com/products')
        .then(res => {
            if (!res.ok) throw new Error('Network response error');
            return res.json();
        })
        .then(data => {
            allProducts = data;
            renderProducts(allProducts);
        })
        .catch(err => {
            console.error('Error fetching catalog:', err);
            if (productGrid) {
                productGrid.innerHTML = `<div class="error-state">Failed to load products: ${err.message}. Please try again later.</div>`;
            }
        });

    // 2. Render Products Grid helper
    function renderProducts(productsList) {
        if (!productGrid) return;
        
        if (productsList.length === 0) {
            productGrid.innerHTML = '<div class="loading-state">No products found matching your search.</div>';
            return;
        }

        productGrid.innerHTML = productsList.map(product => {
            const roundedRating = Math.round(product.rating ? product.rating.rate : 0);
            
            // Build stars SVGs
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                starsHTML += `
                    <svg viewBox="0 0 24 24" width="14" height="14" style="fill: ${i <= roundedRating ? '#fbbf24' : 'transparent'}; stroke: #fbbf24; stroke-width: 2; margin-right: 1px;">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                `;
            }

            return `
                <div class="product-card">
                    <span class="card-badge">${product.category}</span>
                    <div class="product-image-container">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div style="flex-grow: 1;">
                        <h3 class="card-title" title="${product.title}">${product.title}</h3>
                        <div class="card-rating">
                            <div class="card-stars">${starsHTML}</div>
                            <span class="card-rating-count">(${product.rating ? product.rating.count : 0})</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="card-price">$${product.price.toFixed(2)}</span>
                        <a href="productdetail.html?id=${product.id}" class="btn-primary" style="padding: 8px 12px; font-size: 13px; box-shadow: none;">
                            Details
                        </a>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 3. Filter Event Listeners
    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const category = categorySelect ? categorySelect.value : 'all';

        let filtered = allProducts;

        if (query.trim() !== '') {
            filtered = filtered.filter(p => p.title.toLowerCase().includes(query));
        }

        if (category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        renderProducts(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categorySelect) categorySelect.addEventListener('change', applyFilters);
});
