document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.cart-item');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    // Initial setup and calculate
    cartItems.forEach(item => {
        const minusBtn = item.querySelector('.qty-btn:first-child');
        const plusBtn = item.querySelector('.qty-btn:last-child');
        const qtyInput = item.querySelector('.qty-input');
        const removeBtn = item.querySelector('.btn-remove');
        const priceEl = item.querySelector('.price');
        
        // Extract unit price (assuming format $299.00)
        const unitPrice = parseFloat(priceEl.textContent.replace('$', ''));
        // Store on the element for easy math later
        priceEl.dataset.unitPrice = unitPrice;

        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let val = parseInt(qtyInput.value);
                if (val > 1) {
                    qtyInput.value = val - 1;
                    updateItemPrice(item);
                    calculateTotals();
                }
            });
        }

        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let val = parseInt(qtyInput.value);
                qtyInput.value = val + 1;
                updateItemPrice(item);
                calculateTotals();
            });
        }

        if (qtyInput) {
            qtyInput.addEventListener('change', () => {
                let val = parseInt(qtyInput.value);
                if (isNaN(val) || val < 1) qtyInput.value = 1;
                updateItemPrice(item);
                calculateTotals();
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.remove();
                    calculateTotals();
                    updateCartCount();
                }, 300); // Wait for transition
            });
        }
    });

    calculateTotals();

    function updateItemPrice(item) {
        const qty = parseInt(item.querySelector('.qty-input').value);
        const unitPrice = parseFloat(item.querySelector('.price').dataset.unitPrice);
        const newPrice = (qty * unitPrice).toFixed(2);
        item.querySelector('.price').textContent = `$${newPrice}`;
    }

    function calculateTotals() {
        let subtotal = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const priceText = item.querySelector('.price').textContent.replace('$', '');
            subtotal += parseFloat(priceText);
        });

        const taxRate = 0.085; // 8.5% estimated tax
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }

    function updateCartCount() {
        const items = document.querySelectorAll('.cart-item').length;
        const title = document.querySelector('.cart-title');
        if (title) {
            title.textContent = `Your Cart (${items} item${items !== 1 ? 's' : ''})`;
        }
    }
});
