const headerHTML = `
<div class="header-container container">
    <div id="websiteName">
        <a href="home.html" class="logo">
            <span class="text-gradient">TECH</span>STORE
        </a>
    </div>
    <div id="navigations">
        <nav>
            <a href="home.html">Home</a>
            <a href="category.html">Category</a>
            <a href="products.html">Products</a>
            <a href="cart.html">Cart</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        </nav>
    </div>
    <div id="account">
        <a href="login.html" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">Login / Register</a>
    </div>
</div>
`;

window.document.getElementById("header").innerHTML = headerHTML;
