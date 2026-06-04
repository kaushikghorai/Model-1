document.addEventListener('DOMContentLoaded', function() {
    const detailContainer = document.getElementById('detailContainer');

    // 1. Get product ID from query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        if (detailContainer) {
            detailContainer.innerHTML = '<div class="error-state">No product selected. <br><br><a href="products.html" class="btn-primary">Back to Products</a></div>';
        }
        return;
    }

    // 2. Fetch single product details
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => {
            if (!res.ok) throw new Error('Product not found');
            return res.json();
        })
        .then(product => {
            renderProductDetails(product);
        })
        .catch(err => {
            console.error('Error fetching details:', err);
            if (detailContainer) {
                detailContainer.innerHTML = `<div class="error-state">Failed to load details: ${err.message}. <br><br><a href="products.html" class="btn-primary">Back to Products</a></div>`;
            }
        });

    // 3. Render function
    function renderProductDetails(product) {
        if (!detailContainer) return;

        const roundedRating = Math.round(product.rating ? product.rating.rate : 0);
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            starsHTML += `
                <svg viewBox="0 0 24 24" width="16" height="16" style="fill: ${i <= roundedRating ? '#fbbf24' : 'transparent'}; stroke: #fbbf24; stroke-width: 2; margin-right: 2px;">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            `;
        }

        detailContainer.innerHTML = `
            <div class="detail-grid">
                <div class="detail-image-wrapper">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="detail-info-wrapper">
                    <div>
                        <span class="detail-category">${product.category}</span>
                        <h1 class="detail-title">${product.title}</h1>
                        <div class="detail-rating">
                            <div class="detail-stars">${starsHTML}</div>
                            <span class="detail-rating-text">
                                ${product.rating ? product.rating.rate : 0} / 5 (${product.rating ? product.rating.count : 0} reviews)
                            </span>
                        </div>
                        <div class="detail-price">$${product.price.toFixed(2)}</div>
                        <p class="detail-desc">${product.description}</p>
                    </div>

                    <div class="action-buttons">
                        <button id="addToCartBtn" class="btn-primary">
                            Add to Cart
                        </button>
                        <a href="products.html" class="btn-secondary">
                            Back to Store
                        </a>
                    </div>
                </div>
            </div>
        `;

        // 4. Bind Add To Cart click event
        const addToCartBtn = document.getElementById('addToCartBtn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                addToCart(product);
            });
        }
    }

    // 5. Cart Management
    function addToCart(product) {
        let cart = [];
        try {
            const rawCart = localStorage.getItem('cart');
            cart = rawCart ? JSON.parse(rawCart) : [];
        } catch (e) {
            console.error('Error parsing cart:', e);
            cart = [];
        }

        // Check if item is already in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Custom visual feedback
        const addToCartBtn = document.getElementById('addToCartBtn');
        if (addToCartBtn) {
            const originalText = addToCartBtn.textContent;
            addToCartBtn.textContent = '✓ Added!';
            addToCartBtn.style.background = 'var(--success)';
            addToCartBtn.disabled = true;

            setTimeout(() => {
                addToCartBtn.textContent = originalText;
                addToCartBtn.style.background = '';
                addToCartBtn.disabled = false;
            }, 1200);
        }
    }
});
