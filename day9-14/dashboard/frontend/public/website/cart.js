document.addEventListener('DOMContentLoaded', function() {
    const cartTableBody = document.getElementById('cartTableBody');
    const cartTable = document.getElementById('cartTable');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartSummary = document.getElementById('cartSummary');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryTotal = document.getElementById('summaryTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    let cart = [];

    // 1. Load cart items
    function loadCart() {
        try {
            const rawCart = localStorage.getItem('cart');
            cart = rawCart ? JSON.parse(rawCart) : [];
        } catch (e) {
            console.error('Error loading cart data:', e);
            cart = [];
        }
        renderCart();
    }

    // 2. Render Cart Table
    function renderCart() {
        if (cart.length === 0) {
            if (cartTable) cartTable.style.display = 'none';
            if (cartSummary) cartSummary.style.display = 'none';
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            return;
        }

        if (cartTable) cartTable.style.display = 'table';
        if (cartSummary) cartSummary.style.display = 'block';
        if (emptyCartMessage) emptyCartMessage.style.display = 'none';

        let totalSum = 0;

        if (cartTableBody) {
            cartTableBody.innerHTML = cart.map(item => {
                const itemTotal = item.price * item.quantity;
                totalSum += itemTotal;

                return `
                    <tr id="cart-item-${item.id}">
                        <td>
                            <div class="cart-img-thumbnail">
                                <img src="${item.image}" alt="${item.title}">
                            </div>
                        </td>
                        <td>
                            <strong style="color: var(--text-primary); font-size: 14px;">${item.title}</strong>
                        </td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>
                            <input 
                                type="number" 
                                class="cart-quantity-input" 
                                value="${item.quantity}" 
                                min="1" 
                                max="99" 
                                data-id="${item.id}"
                            >
                        </td>
                        <td id="item-total-${item.id}" style="font-weight: 600; color: var(--text-primary);">
                            $${itemTotal.toFixed(2)}
                        </td>
                        <td>
                            <div style="display: flex; justify-content: center;">
                                <button class="btn-remove" data-id="${item.id}" title="Remove Item">
                                    <svg viewBox="0 0 24 24">
                                        <line x1="18" y1="6" x2="6" y2="18"/>
                                        <line x1="6" y1="6" x2="18" y2="18"/>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');

            // Bind Event listeners to dynamically generated inputs and buttons
            const quantityInputs = cartTableBody.querySelectorAll('.cart-quantity-input');
            quantityInputs.forEach(input => {
                input.addEventListener('change', handleQuantityChange);
            });

            const removeButtons = cartTableBody.querySelectorAll('.btn-remove');
            removeButtons.forEach(btn => {
                btn.addEventListener('click', handleRemoveItem);
            });
        }

        // Update summaries
        updateTotals(totalSum);
    }

    // 3. Handle Quantity Change
    function handleQuantityChange(e) {
        const id = parseInt(e.target.dataset.id);
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) {
            val = 1;
            e.target.value = 1;
        }

        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity = val;
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Recalculate totals
            const itemTotal = cart[itemIndex].price * val;
            const subtotalCell = document.getElementById(`item-total-${id}`);
            if (subtotalCell) {
                subtotalCell.textContent = `$${itemTotal.toFixed(2)}`;
            }

            // Recalculate overall total sum
            let totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            updateTotals(totalSum);
        }
    }

    // 4. Handle Remove Item
    function handleRemoveItem(e) {
        const btn = e.currentTarget;
        const id = parseInt(btn.dataset.id);

        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Visual row collapse or full rerender
        const row = document.getElementById(`cart-item-${id}`);
        if (row) {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            row.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                renderCart();
            }, 300);
        } else {
            renderCart();
        }
    }

    // 5. Update Totals
    function updateTotals(sum) {
        const formatted = `$${sum.toFixed(2)}`;
        if (summarySubtotal) summarySubtotal.textContent = formatted;
        if (summaryTotal) summaryTotal.textContent = formatted;
        localStorage.setItem('cartTotal', sum.toFixed(2));
    }

    loadCart();
});
