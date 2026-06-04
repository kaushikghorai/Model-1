(function() {
    // 1. Build Header inner HTML with mobile hamburger toggle
    const headerEl = window.document.getElementById("header");
    if (headerEl) {
        headerEl.innerHTML = `
            <div id="websiteName">
                <a href="home.html" style="text-decoration: none; color: inherit;">
                    <span style="color: var(--primary);">Shop</span>Flow
                </a>
            </div>
            <button id="menuToggle" aria-label="Toggle Menu">
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
            </button>
            <div id="navigations">
                <nav>
                    <a href="home.html" id="nav-home">Home</a>
                    <a href="products.html" id="nav-products">Products</a>
                    <a href="cart.html" id="nav-cart">Cart</a>
                    <a href="about.html" id="nav-about">About Us</a>
                    <a href="contact.html" id="nav-contact">Contact</a>
                </nav>
            </div>
            <div id="account"></div>
        `;
    }

    // 2. Highlight Active Nav Tab
    const path = window.location.pathname;
    const pageName = path.substring(path.lastIndexOf('/') + 1);
    
    if (pageName.includes('home.html') || pageName === '') {
        setActive('nav-home');
    } else if (pageName.includes('products.html') || pageName.includes('productdetail.html')) {
        setActive('nav-products');
    } else if (pageName.includes('cart.html')) {
        setActive('nav-cart');
    } else if (pageName.includes('about.html')) {
        setActive('nav-about');
    } else if (pageName.includes('contact.html')) {
        setActive('nav-contact');
    }

    function setActive(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    }

    // 3. User Session State Check
    const accountEl = document.getElementById("account");
    if (accountEl) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            accountEl.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-weight: 500; font-size: 14px; color: var(--text-secondary);">
                        Hi, <strong>${currentUser}</strong>
                    </span>
                    <button id="logoutBtn" style="padding: 6px 12px; font-size: 12px; background: var(--bg-tertiary); color: var(--text-primary) !important; border: 1px solid var(--border-color); box-shadow: none;">
                        Logout
                    </button>
                </div>
            `;
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function() {
                    localStorage.removeItem('currentUser');
                    window.location.reload();
                });
            }
        } else {
            accountEl.innerHTML = `
                <a href="login.html" class="btn-primary" style="padding: 8px 16px; font-size: 13px; box-shadow: none;">
                    Login
                </a>
            `;
        }
    }

    // 4. Mobile Menu Hamburger Drawer Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navigations = document.getElementById('navigations');
    if (menuToggle && navigations) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navigations.classList.toggle('mobile-open');
        });
        
        // Close menu on click elsewhere
        document.addEventListener('click', function() {
            navigations.classList.remove('mobile-open');
        });
        navigations.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
})();
