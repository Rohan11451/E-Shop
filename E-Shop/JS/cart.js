// cart.js - Handles displaying cart items on cart.html

document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cartList');
    const cartEmpty = document.getElementById('cartEmpty');
    const subtotalElem = document.getElementById('subtotal');
    const shippingElem = document.getElementById('shipping');
    const taxElem = document.getElementById('tax');
    const cartTotalElem = document.getElementById('cartTotal');

    let subtotal = 0;
    let shipping = 0;
    let tax = 0;
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '';
        cartEmpty.style.display = 'block';
        subtotalElem.textContent = '$0.00';
        shippingElem.textContent = '$0.00';
        taxElem.textContent = '$0.00';
        cartTotalElem.textContent = '$0.00';
        return;
    } else {
        cartEmpty.style.display = 'none';
    }

    cartList.innerHTML = cart.map(item => {
        // Ensure price is a number (remove $ or commas if present)
        let priceNum = parseFloat(String(item.price).replace(/[^0-9.]/g, ''));
        if (isNaN(priceNum)) priceNum = 0;
        const itemTotal = priceNum * item.quantity;
        subtotal += itemTotal;
        return `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-details">
                <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;">
                <div class="item-info">
                    <h3>${item.name}</h3>
                </div>
            </div>
            <div class="item-price">$${priceNum.toFixed(2)}</div>
            <div class="item-quantity">
                <span class="quantity">${item.quantity}</span>
            </div>
            <div class="item-total">$${itemTotal.toFixed(2)}</div>
            <div class="item-action">
                <button class="remove-btn" onclick="removeFromCart('${item.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        `;
    }).join('');

    // Example: shipping is $10 if subtotal > 0
    shipping = subtotal > 0 ? 10 : 0;
    // Example: tax is 8% of subtotal
    tax = subtotal * 0.08;
    total = subtotal + shipping + tax;

    subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    shippingElem.textContent = `$${shipping.toFixed(2)}`;
    taxElem.textContent = `$${tax.toFixed(2)}`;
    cartTotalElem.textContent = `$${total.toFixed(2)}`;
});

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cleanId = String(productId).trim();
    cart = cart.filter(item => String(item.id).trim() !== cleanId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}
