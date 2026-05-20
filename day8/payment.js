document.addEventListener('DOMContentLoaded', function() {
    const paypalButton = document.querySelector('#paymentForm button[type="button"]');
    const paypalDetails = document.querySelector('.payment-details');

    // Toggle PayPal details
    paypalButton.addEventListener('click', function() {
        if (paypalDetails.style.display === 'none') {
            paypalDetails.style.display = 'block';
        } else {
            paypalDetails.style.display = 'none';
        }
    });

    // Handle form submission
    document.querySelector('#paymentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Order placed successfully!');
        this.reset();
    });
});
