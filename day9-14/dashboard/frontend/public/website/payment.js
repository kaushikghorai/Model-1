document.addEventListener('DOMContentLoaded', function() {
    const summaryItemsList = document.getElementById('summaryItemsList');
    const summaryTotalPrice = document.getElementById('summaryTotalPrice');
    
    const creditRadio = document.getElementById('creditCard');
    const paypalRadio = document.getElementById('paypal');
    const creditCardDetails = document.getElementById('creditCardDetails');
    const paypalDetails = document.getElementById('paypalDetails');
    const paymentForm = document.getElementById('paymentForm');

    // 1. Toggle Payment Input Details
    function toggleDetails() {
        if (creditRadio && creditRadio.checked) {
            if (creditCardDetails) creditCardDetails.style.display = 'block';
            if (paypalDetails) paypalDetails.style.display = 'none';
        } else if (paypalRadio && paypalRadio.checked) {
            if (creditCardDetails) creditCardDetails.style.display = 'none';
            if (paypalDetails) paypalDetails.style.display = 'block';
        }
    }

    if (creditRadio) creditRadio.addEventListener('change', toggleDetails);
    if (paypalRadio) paypalRadio.addEventListener('change', toggleDetails);

    // 2. Load Cart summary details
    let cart = [];
    try {
        const rawCart = localStorage.getItem('cart');
        cart = rawCart ? JSON.parse(rawCart) : [];
    } catch (e) {
        console.error('Error loading cart for checkout:', e);
    }

    if (cart.length === 0) {
        alert('Your cart is empty. Redirecting back to store...');
        window.location.href = 'products.html';
        return;
    }

    // Populate dynamic summary items
    let totalSum = 0;
    if (summaryItemsList) {
        summaryItemsList.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            totalSum += itemTotal;
            return `
                <li>
                    <span>${item.title} <strong>x ${item.quantity}</strong></span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </li>
            `;
        }).join('');
    }

    if (summaryTotalPrice) {
        summaryTotalPrice.textContent = `$${totalSum.toFixed(2)}`;
    }

    // 3. Handle Checkout Form Submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Simulating payment process
            const submitBtn = paymentForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing Payment...';
            }

            setTimeout(() => {
                alert('Payment Successful! Thank you for your purchase. Your order has been placed.');
                
                // Clear cart state
                localStorage.removeItem('cart');
                localStorage.removeItem('cartTotal');
                
                // Redirect home
                window.location.href = 'home.html';
            }, 1500);
        });
    }
});
