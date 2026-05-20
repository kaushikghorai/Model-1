const footerHTML = `
<footer class="footer">
    <div class="container footer-content">
        <div class="footer-section">
            <h3 class="logo"><span class="text-gradient">TECH</span>STORE</h3>
            <p class="text-muted mt-4">Your one-stop destination for premium tech gear, offering the latest innovations with unbeatable service.</p>
        </div>
        <div class="footer-section">
            <h4>Quick Links</h4>
            <ul class="footer-links">
                <li><a href="home.html">Home</a></li>
                <li><a href="products.html">Products</a></li>
                <li><a href="category.html">Categories</a></li>
                <li><a href="about.html">About Us</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h4>Customer Service</h4>
            <ul class="footer-links">
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="#">Shipping Policy</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
                <li><a href="faq.html">FAQs</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h4>Stay Connected</h4>
            <p class="text-muted mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
            <div class="newsletter-form">
                <input type="email" placeholder="Enter your email" class="form-control">
                <button class="btn btn-primary mt-2 w-100">Subscribe</button>
            </div>
        </div>
    </div>
    <div class="footer-bottom text-center">
        <p class="text-muted">&copy; 2026 TechStore. All rights reserved.</p>
    </div>
</footer>
<button id="scrollToTopBtn" class="scroll-to-top" title="Go to top">↑</button>
`;

document.addEventListener('DOMContentLoaded', function() {
    window.document.getElementById("footer").innerHTML = footerHTML;

    // Scroll to Top Logic
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (scrollBtn) {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollBtn.classList.add("show");
            } else {
                scrollBtn.classList.remove("show");
            }
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
