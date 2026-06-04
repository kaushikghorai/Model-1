document.addEventListener('DOMContentLoaded', function() {
    const featuredProductList = document.getElementById('featuredProductList');

    // Fetch the first 3 items from products API
    fetch('https://fakestoreapi.com/products?limit=3')
        .then(res => {
            if (!res.ok) throw new Error('API connection error');
            return res.json();
        })
        .then(products => {
            renderFeatured(products);
        })
        .catch(err => {
            console.error('Error fetching featured products:', err);
            if (featuredProductList) {
                featuredProductList.innerHTML = '<div class="loading-placeholder" style="color: var(--danger);">Failed to load featured items.</div>';
            }
        });

    function renderFeatured(products) {
        if (!featuredProductList) return;

        featuredProductList.innerHTML = products.map(product => {
            const roundedRating = Math.round(product.rating ? product.rating.rate : 0);
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                starsHTML += `
                    <svg viewBox="0 0 24 24" width="12" height="12" style="fill: ${i <= roundedRating ? '#fbbf24' : 'transparent'}; stroke: #fbbf24; stroke-width: 2; margin-right: 1px;">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                `;
            }

            return `
                <div class="product-item">
                    <span class="item-badge">${product.category}</span>
                    <div class="item-img-box">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <h3 class="item-title" title="${product.title}">${product.title}</h3>
                    <div class="item-rating">
                        <div class="item-stars">${starsHTML}</div>
                    </div>
                    <div class="item-footer">
                        <span class="item-price">$${product.price.toFixed(2)}</span>
                        <a href="productdetail.html?id=${product.id}" class="btn-primary" style="padding: 6px 12px; font-size: 12px; box-shadow: none;">
                            View Details
                        </a>
                    </div>
                </div>
            `;
        }).join('');
    }
});
