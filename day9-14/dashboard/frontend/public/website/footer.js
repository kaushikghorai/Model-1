document.addEventListener('DOMContentLoaded', function() {
    const footerEl = window.document.getElementById("footer");
    if (footerEl) {
        footerEl.innerHTML = `
            <div class="footer-container">
                <p>&copy; ${new Date().getFullYear()} ShopFlow. Built with HTML, CSS, and JS. All rights reserved.</p>
            </div>
        `;
    }
});
