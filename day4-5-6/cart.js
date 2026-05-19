function removeItem(button) {
    const row = button.parentNode.parentNode;
    const totalPriceCell = document.querySelector('#totalPrice h2');
    const currentTotal = parseFloat(totalPriceCell.innerText.split(': ')[1].trim());
    const itemTotal = parseFloat(row.cells[3].innerText.trim());

    row.remove();
    totalPriceCell.innerText = `Total Price: $${(currentTotal - itemTotal).toFixed(2)}`;
}
function changePrize(input){
	var prize = input.parentNode.parentNode.childNodes[3].textContent;
	var quantity = input.value;
	var subTotal = prize * quantity;
	input.parentNode.parentNode.childNodes[7].innerText = subTotal;
}
