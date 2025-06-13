
// Product data
const products = [
    {
        id: 1,
        name: "Chicken Curry Cut",
        description: "Fresh chicken cut into curry pieces, perfect for traditional dishes",
        price: 320,
        unit: "kg",
        category: "chicken",
        icon: "🐔"
    },
    {
        id: 2,
        name: "Mutton Boneless",
        description: "Premium boneless mutton, tender and flavorful",
        price: 820,
        unit: "kg",
        category: "mutton",
        icon: "🐏"
    },
    {
        id: 3,
        name: "Chicken Biryani Cut",
        description: "Specially cut chicken pieces for the perfect biryani",
        price: 340,
        unit: "kg",
        category: "chicken",
        icon: "🐔"
    },
    {
        id: 4,
        name: "Mutton Keema",
        description: "Freshly ground mutton mince for kebabs and curries",
        price: 850,
        unit: "kg",
        category: "mutton",
        icon: "🥩"
    },
    {
        id: 5,
        name: "Chicken Tandoori Cut",
        description: "Marinated chicken pieces ready for tandoori preparation",
        price: 380,
        unit: "kg",
        category: "chicken",
        icon: "🍗"
    },
    {
        id: 6,
        name: "Mutton Chops",
        description: "Premium mutton chops, perfect for grilling",
        price: 900,
        unit: "kg",
        category: "mutton",
        icon: "🥩"
    }
];

// App state
let cart = [];
let user = null;
let deferredPrompt = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadCart();
    setupPWA();
});

// Load products
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.icon}
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div>
                        <span class="product-price">₹${product.price}</span>
                        <span class="product-unit">per ${product.unit}</span>
                    </div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCart();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCartUI();
            saveCart();
        }
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
    checkoutTotal.textContent = totalPrice;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <button class="btn btn-outline" onclick="closeCartModal()">Continue Shopping</button>
            </div>
        `;
        cartFooter.classList.add('hidden');
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} per ${item.unit}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="btn btn-outline" onclick="removeFromCart(${item.id})" style="margin-left: 0.5rem; padding: 0.25rem 0.5rem;">🗑️</button>
                </div>
            </div>
        `).join('');
        cartFooter.classList.remove('hidden');
    }
}

function saveCart() {
    localStorage.setItem('bukbuk-cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('bukbuk-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Modal functions
function openCartModal() {
    document.getElementById('cartModal').classList.add('active');
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('active');
}

function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

function openCheckoutModal() {
    closeCartModal();
    document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// Form handlers
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate login
    user = { email, name: 'John Doe' };
    showToast('Welcome back! You have been successfully logged in.');
    closeLoginModal();
}

function handleCheckout(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Simulate order processing
    showToast('Order placed successfully! Your order will be delivered in 30 minutes!');
    
    // Clear cart
    cart = [];
    updateCartUI();
    saveCart();
    closeCheckoutModal();
}

function selectPaymentMethod(method) {
    // Remove selected class from all payment methods
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selected class to clicked method
    event.currentTarget.classList.add('selected');
    
    // Update radio button
    document.querySelectorAll('input[name="payment"]').forEach(input => {
        input.checked = input.value === method;
    });
}

// PWA Setup
function setupPWA() {
    // Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(createServiceWorkerBlob())
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    }
    
    // Install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        document.getElementById('installPrompt').classList.add('show');
        document.getElementById('installBtn').classList.remove('hidden');
    });
    
    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        document.getElementById('installPrompt').classList.remove('show');
        document.getElementById('installBtn').classList.add('hidden');
    });
}

function createServiceWorkerBlob() {
    const swCode = `
        const CACHE_NAME = 'bukbuk-v1';
        const urlsToCache = ['/'];
        
        self.addEventListener('install', function(event) {
            event.waitUntil(
                caches.open(CACHE_NAME)
                    .then(function(cache) {
                        return cache.addAll(urlsToCache);
                    })
            );
        });
        
        self.addEventListener('fetch', function(event) {
            event.respondWith(
                caches.match(event.request)
                    .then(function(response) {
                        return response || fetch(event.request);
                    }
                )
            );
        });
    `;
    
    const blob = new Blob([swCode], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
            document.getElementById('installPrompt').classList.remove('show');
        });
    }
}

function dismissInstallPrompt() {
    document.getElementById('installPrompt').classList.remove('show');
}

// Utility functions
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#dc2626' : '#10b981'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1001;
        font-weight: 500;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});
