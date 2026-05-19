document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('promoModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const submitBtn = document.getElementById('submitModalBtn');

    if (modal && openBtn && closeBtn) {
        // Open Modal
        openBtn.addEventListener('click', () => {
            modal.classList.add('show');
        });

        // Close Modal via Button
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        // Close Modal via Backdrop Click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });

        // Handle Submit
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                submitBtn.textContent = "Discount Claimed ✓";
                setTimeout(() => {
                    modal.classList.remove('show');
                    submitBtn.textContent = "Claim My Discount";
                }, 1500);
            });
        }
    }
});
