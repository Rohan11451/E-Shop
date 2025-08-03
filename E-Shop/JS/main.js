// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize cart count
    updateCartCount();
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = count;
        element.style.display = count > 0 ? 'flex' : 'none';
    });
}

function addToCart(productId, productName, price, image) {
    // Ensure productId is trimmed and consistent
    const cleanId = String(productId).trim();
    const existingItem = cart.find(item => String(item.id).trim() === cleanId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: cleanId,
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Show added to cart notification
    alert(`${productName} has been added to your cart!`);
}

// Event delegation for add to cart buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const button = e.target;
        const productCard = button.closest('.product-card');
        const productId = button.getAttribute('data-id');
        const productName = productCard.querySelector('h3').textContent;
        const price = productCard.querySelector('.product-price').textContent;
        const image = productCard.querySelector('img').src;
        
        addToCart(productId, productName, price, image);
    }
});

