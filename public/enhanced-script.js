
// Enhanced BukBuk Script with new features and improvements

// Language support
const translations = {
    en: {
        'app-name': 'BukBuk',
        'tagline': 'Fresh Meat Delivered to Your Door',
        'login': 'Login',
        'cart': 'Cart',
        'install-app': 'Install App',
        'hero-title': 'Fresh Meat, Delivered Fast',
        'hero-subtitle': 'Premium quality chicken, mutton, and kebabs delivered to your doorstep in 30 minutes',
        'feature-delivery': '30-Min Delivery',
        'feature-delivery-desc': 'Lightning-fast delivery to your doorstep',
        'feature-quality': 'Premium Quality',
        'feature-quality-desc': 'Fresh, halal-certified meat from trusted sources',
        'feature-price': 'Best Prices',
        'feature-price-desc': 'Competitive prices with regular offers',
        'products-title': 'Our Fresh Products',
        'cart-title': 'Shopping Cart',
        'coupon-label': 'Have a coupon code?',
        'apply-coupon': 'Apply',
        'empty-cart': 'Your cart is empty',
        'continue-shopping': 'Continue Shopping',
        'subtotal': 'Subtotal:',
        'discount': 'Discount:',
        'total': 'Total:',
        'proceed-checkout': 'Proceed to Checkout',
        'welcome': 'Welcome to BukBuk',
        'email': 'Email',
        'password': 'Password',
        'complete-order': 'Complete Your Order',
        'delivery-address': 'Delivery Address',
        'phone-number': 'Phone Number',
        'payment-method': 'Payment Method',
        'credit-card': 'Credit/Debit Card',
        'upi-payment': 'UPI Payment',
        'cash-delivery': 'Cash on Delivery',
        'place-order': 'Place Order',
        'install-title': 'Install BukBuk App',
        'install-desc': 'Get the full app experience!',
        'install': 'Install',
        'admin-settings': 'Admin Settings',
        'admin-email': 'Admin Email',
        'smtp-settings': 'SMTP Settings (Optional)',
        'save-settings': 'Save Settings',
        'enter-address': 'Enter your complete address',
        'enter-phone': 'Enter your phone number',
        'add-to-cart': 'Add to Cart'
    },
    hi: {
        'app-name': 'बुकबुक',
        'tagline': 'ताज़ा मांस आपके दरवाज़े तक',
        'login': 'लॉगिन',
        'cart': 'कार्ट',
        'install-app': 'ऐप इंस्टॉल करें',
        'hero-title': 'ताज़ा मांस, तेज़ डिलीवरी',
        'hero-subtitle': '30 मिनट में आपके दरवाज़े तक प्रीमियम चिकन, मटन और कबाब',
        'feature-delivery': '30 मिनट डिलीवरी',
        'feature-delivery-desc': 'आपके दरवाज़े तक बिजली की गति से डिलीवरी',
        'feature-quality': 'प्रीमियम गुणवत्ता',
        'feature-quality-desc': 'विश्वसनीय स्रोतों से ताज़ा, हलाल प्रमाणित मांस',
        'feature-price': 'सबसे अच्छी कीमतें',
        'feature-price-desc': 'नियमित ऑफर के साथ प्रतिस्पर्धी कीमतें',
        'products-title': 'हमारे ताज़े उत्पाद',
        'cart-title': 'शॉपिंग कार्ट',
        'coupon-label': 'कूपन कोड है?',
        'apply-coupon': 'लागू करें',
        'empty-cart': 'आपका कार्ट खाली है',
        'continue-shopping': 'खरीदारी जारी रखें',
        'subtotal': 'उप-योग:',
        'discount': 'छूट:',
        'total': 'कुल:',
        'proceed-checkout': 'चेकआउट पर जाएं',
        'welcome': 'बुकबुक में आपका स्वागत है',
        'email': 'ईमेल',
        'password': 'पासवर्ड',
        'complete-order': 'अपना ऑर्डर पूरा करें',
        'delivery-address': 'डिलीवरी पता',
        'phone-number': 'फोन नंबर',
        'payment-method': 'भुगतान विधि',
        'credit-card': 'क्रेडिट/डेबिट कार्ड',
        'upi-payment': 'UPI भुगतान',
        'cash-delivery': 'डिलीवरी पर नकद',
        'place-order': 'ऑर्डर दें',
        'install-title': 'बुकबुक ऐप इंस्टॉल करें',
        'install-desc': 'पूरा ऐप अनुभव पाएं!',
        'install': 'इंस्टॉल करें',
        'admin-settings': 'एडमिन सेटिंग्स',
        'admin-email': 'एडमिन ईमेल',
        'smtp-settings': 'SMTP सेटिंग्स (वैकल्पिक)',
        'save-settings': 'सेटिंग्स सेव करें',
        'enter-address': 'अपना पूरा पता दर्ज करें',
        'enter-phone': 'अपना फोन नंबर दर्ज करें',
        'add-to-cart': 'कार्ट में जोड़ें'
    }
};

// Enhanced product data with Hindi names
const products = [
    {
        id: 1,
        name: "Chicken Curry Cut",
        nameHi: "चिकन करी कट",
        description: "Fresh chicken cut into curry pieces, perfect for traditional dishes",
        descriptionHi: "पारंपरिक व्यंजनों के लिए बिल्कुल सही, करी के टुकड़ों में कटा ताज़ा चिकन",
        price: 320,
        unit: "kg",
        unitHi: "किलो",
        category: "chicken",
        icon: "🐔"
    },
    {
        id: 2,
        name: "Mutton Boneless",
        nameHi: "मटन बोनलेस",
        description: "Premium boneless mutton, tender and flavorful",
        descriptionHi: "प्रीमियम बिना हड्डी का मटन, कोमल और स्वादिष्ट",
        price: 820,
        unit: "kg",
        unitHi: "किलो",
        category: "mutton",
        icon: "🐏"
    },
    {
        id: 3,
        name: "Chicken Biryani Cut",
        nameHi: "चिकन बिरयानी कट",
        description: "Specially cut chicken pieces for the perfect biryani",
        descriptionHi: "परफेक्ट बिरयानी के लिए विशेष रूप से काटे गए चिकन के टुकड़े",
        price: 340,
        unit: "kg",
        unitHi: "किलो",
        category: "chicken",
        icon: "🐔"
    },
    {
        id: 4,
        name: "Mutton Keema",
        nameHi: "मटन कीमा",
        description: "Freshly ground mutton mince for kebabs and curries",
        descriptionHi: "कबाब और करी के लिए ताज़ा पिसा हुआ मटन कीमा",
        price: 850,
        unit: "kg",
        unitHi: "किलो",
        category: "mutton",
        icon: "🥩"
    },
    {
        id: 5,
        name: "Chicken Tandoori Cut",
        nameHi: "चिकन तंदूरी कट",
        description: "Marinated chicken pieces ready for tandoori preparation",
        descriptionHi: "तंदूरी तैयारी के लिए तैयार मैरिनेट किए गए चिकन के टुकड़े",
        price: 380,
        unit: "kg",
        unitHi: "किलो",
        category: "chicken",
        icon: "🍗"
    },
    {
        id: 6,
        name: "Mutton Chops",
        nameHi: "मटन चॉप्स",
        description: "Premium mutton chops, perfect for grilling",
        descriptionHi: "ग्रिलिंग के लिए बिल्कुल सही प्रीमियम मटन चॉप्स",
        price: 900,
        unit: "kg",
        unitHi: "किलो",
        category: "mutton",
        icon: "🥩"
    }
];

// Coupon codes
const coupons = {
    'WELCOME10': { discount: 10, type: 'percentage', minOrder: 500 },
    'SAVE50': { discount: 50, type: 'fixed', minOrder: 300 },
    'NEWUSER': { discount: 15, type: 'percentage', minOrder: 800 },
    'FESTIVE20': { discount: 20, type: 'percentage', minOrder: 1000 }
};

// App state
let cart = [];
let user = null;
let deferredPrompt = null;
let currentLanguage = 'en';
let appliedCoupon = null;
let adminSettings = {
    email: 'admin@bukbuk.com',
    smtpHost: '',
    smtpUsername: '',
    smtpPassword: ''
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadCart();
    loadLanguage();
    loadAdminSettings();
    setupPWA();
    setupAdminAccess();
    updatePlaceholders();
});

// Language functions
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('bukbuk-language', lang);
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Update text content
    updateTranslations();
    loadProducts();
    updatePlaceholders();
}

function loadLanguage() {
    const savedLang = localStorage.getItem('bukbuk-language') || 'en';
    switchLanguage(savedLang);
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

function updatePlaceholders() {
    const addressInput = document.getElementById('address');
    const phoneInput = document.getElementById('phone');
    
    if (addressInput) {
        addressInput.placeholder = translations[currentLanguage]['enter-address'];
    }
    if (phoneInput) {
        phoneInput.placeholder = translations[currentLanguage]['enter-phone'];
    }
}

// Load products with language support
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    const isHindi = currentLanguage === 'hi';
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.icon}
            </div>
            <div class="product-content">
                <h3 class="product-name">${isHindi ? product.nameHi : product.name}</h3>
                <p class="product-description">${isHindi ? product.descriptionHi : product.description}</p>
                <div class="product-footer">
                    <div>
                        <span class="product-price">₹${product.price}</span>
                        <span class="product-unit">${translations[currentLanguage]['total']} ${isHindi ? product.unitHi : product.unit}</span>
                    </div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        ${translations[currentLanguage]['add-to-cart']}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Enhanced cart functions with coupon support
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
    showToast(`${currentLanguage === 'hi' ? product.nameHi : product.name} ${currentLanguage === 'hi' ? 'कार्ट में जोड़ा गया!' : 'added to cart!'}`);
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

// Coupon functions
function applyCoupon() {
    const couponCode = document.getElementById('couponCode').value.toUpperCase().trim();
    const couponMessage = document.getElementById('couponMessage');
    
    if (!couponCode) {
        showCouponMessage('Please enter a coupon code', 'error');
        return;
    }
    
    const coupon = coupons[couponCode];
    if (!coupon) {
        showCouponMessage('Invalid coupon code', 'error');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (subtotal < coupon.minOrder) {
        showCouponMessage(`Minimum order value ₹${coupon.minOrder} required`, 'error');
        return;
    }
    
    appliedCoupon = { code: couponCode, ...coupon };
    updateCartUI();
    showCouponMessage(`Coupon applied! You saved ₹${calculateDiscount()}`, 'success');
    
    // Disable coupon input
    document.getElementById('couponCode').value = couponCode;
    document.getElementById('couponCode').disabled = true;
    document.querySelector('[data-key="apply-coupon"]').textContent = 'Applied';
    document.querySelector('[data-key="apply-coupon"]').disabled = true;
}

function showCouponMessage(message, type) {
    const couponMessage = document.getElementById('couponMessage');
    couponMessage.textContent = message;
    couponMessage.className = `coupon-message ${type}`;
    couponMessage.classList.remove('hidden');
    
    if (type === 'error') {
        setTimeout(() => {
            couponMessage.classList.add('hidden');
        }, 3000);
    }
}

function calculateDiscount() {
    if (!appliedCoupon) return 0;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (appliedCoupon.type === 'percentage') {
        return Math.round((subtotal * appliedCoupon.discount) / 100);
    } else {
        return appliedCoupon.discount;
    }
}

function removeCoupon() {
    appliedCoupon = null;
    document.getElementById('couponCode').value = '';
    document.getElementById('couponCode').disabled = false;
    document.querySelector('[data-key="apply-coupon"]').textContent = translations[currentLanguage]['apply-coupon'];
    document.querySelector('[data-key="apply-coupon"]').disabled = false;
    document.getElementById('couponMessage').classList.add('hidden');
    updateCartUI();
}

// Enhanced cart UI with discount display
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const discountRow = document.getElementById('discountRow');
    const discountAmount = document.getElementById('discountAmount');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = calculateDiscount();
    const finalTotal = subtotal - discount;
    
    cartCount.textContent = totalItems;
    cartSubtotal.textContent = subtotal;
    cartTotal.textContent = finalTotal;
    checkoutTotal.textContent = finalTotal;
    
    // Show/hide discount row
    if (discount > 0) {
        discountAmount.textContent = discount;
        discountRow.style.display = 'flex';
    } else {
        discountRow.style.display = 'none';
    }
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>${translations[currentLanguage]['empty-cart']}</p>
                <button class="btn btn-outline" onclick="closeCartModal()">${translations[currentLanguage]['continue-shopping']}</button>
            </div>
        `;
        cartFooter.classList.add('hidden');
        document.getElementById('couponSection').style.display = 'none';
    } else {
        const isHindi = currentLanguage === 'hi';
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${isHindi ? item.nameHi : item.name}</div>
                    <div class="cart-item-price">₹${item.price} ${translations[currentLanguage]['total']} ${isHindi ? item.unitHi : item.unit}</div>
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
        document.getElementById('couponSection').style.display = 'block';
    }
}

function saveCart() {
    localStorage.setItem('bukbuk-cart', JSON.stringify(cart));
    localStorage.setItem('bukbuk-coupon', JSON.stringify(appliedCoupon));
}

function loadCart() {
    const savedCart = localStorage.getItem('bukbuk-cart');
    const savedCoupon = localStorage.getItem('bukbuk-coupon');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
    
    if (savedCoupon && savedCoupon !== 'null') {
        appliedCoupon = JSON.parse(savedCoupon);
        if (appliedCoupon) {
            document.getElementById('couponCode').value = appliedCoupon.code;
            document.getElementById('couponCode').disabled = true;
            document.querySelector('[data-key="apply-coupon"]').textContent = 'Applied';
            document.querySelector('[data-key="apply-coupon"]').disabled = true;
            showCouponMessage(`Coupon ${appliedCoupon.code} is active`, 'success');
        }
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

function openAdminModal() {
    document.getElementById('adminModal').classList.add('active');
}

function closeAdminModal() {
    document.getElementById('adminModal').classList.remove('active');
}

// Admin functions
function setupAdminAccess() {
    // Show admin button after 5 clicks on logo
    let logoClicks = 0;
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        logoClicks++;
        if (logoClicks >= 5) {
            document.querySelector('.admin-access-btn').classList.remove('hidden');
            showToast('Admin access enabled!');
        }
    });
}

function loadAdminSettings() {
    const saved = localStorage.getItem('bukbuk-admin');
    if (saved) {
        adminSettings = JSON.parse(saved);
        document.getElementById('adminEmail').value = adminSettings.email;
        document.getElementById('smtpHost').value = adminSettings.smtpHost;
        document.getElementById('smtpUsername').value = adminSettings.smtpUsername;
        document.getElementById('smtpPassword').value = adminSettings.smtpPassword;
    }
}

function saveAdminSettings() {
    adminSettings = {
        email: document.getElementById('adminEmail').value,
        smtpHost: document.getElementById('smtpHost').value,
        smtpUsername: document.getElementById('smtpUsername').value,
        smtpPassword: document.getElementById('smtpPassword').value
    };
    
    localStorage.setItem('bukbuk-admin', JSON.stringify(adminSettings));
    showToast('Admin settings saved successfully!');
    closeAdminModal();
}

// Enhanced notification system
async function sendOrderNotification(orderData) {
    console.log('Sending order notification...', orderData);
    
    // Email notification using SMTP.js
    try {
        if (adminSettings.smtpHost && adminSettings.smtpUsername && adminSettings.smtpPassword) {
            // Custom SMTP configuration
            await Email.send({
                Host: adminSettings.smtpHost,
                Username: adminSettings.smtpUsername,
                Password: adminSettings.smtpPassword,
                To: adminSettings.email,
                From: adminSettings.smtpUsername,
                Subject: `New Order #${orderData.orderId} - BukBuk`,
                Body: generateOrderEmailBody(orderData)
            });
        } else {
            // Fallback to SMTP.js demo (limited functionality)
            await Email.send({
                SecureToken: "your-secure-token", // You'll need to configure this
                To: adminSettings.email,
                From: "noreply@bukbuk.com",
                Subject: `New Order #${orderData.orderId} - BukBuk`,
                Body: generateOrderEmailBody(orderData)
            });
        }
        
        console.log('Email notification sent successfully');
    } catch (error) {
        console.error('Failed to send email notification:', error);
    }
    
    // SMS notification (placeholder - would need Twilio or similar service)
    // For demo purposes, we'll log the SMS content
    console.log('SMS notification would be sent:', generateOrderSMSBody(orderData));
}

function generateOrderEmailBody(orderData) {
    const isHindi = currentLanguage === 'hi';
    return `
        <h2>New Order Received - BukBuk</h2>
        <p><strong>Order ID:</strong> ${orderData.orderId}</p>
        <p><strong>Customer:</strong> ${orderData.phone}</p>
        <p><strong>Address:</strong> ${orderData.address}</p>
        <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
        <p><strong>Total Amount:</strong> ₹${orderData.total}</p>
        
        <h3>Order Items:</h3>
        <ul>
            ${orderData.items.map(item => `
                <li>${isHindi ? item.nameHi : item.name} x ${item.quantity} - ₹${item.price * item.quantity}</li>
            `).join('')}
        </ul>
        
        ${orderData.discount > 0 ? `<p><strong>Discount Applied:</strong> ₹${orderData.discount}</p>` : ''}
        
        <p><strong>Order Time:</strong> ${new Date().toLocaleString()}</p>
        <p>Please prepare the order for delivery within 30 minutes.</p>
    `;
}

function generateOrderSMSBody(orderData) {
    return `New BukBuk Order #${orderData.orderId}: ₹${orderData.total} - ${orderData.items.length} items to ${orderData.address}. Phone: ${orderData.phone}`;
}

// Form handlers
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate login
    user = { email, name: 'John Doe' };
    showToast(currentLanguage === 'hi' ? 'वापसी पर स्वागत है! आप सफलतापूर्वक लॉग इन हो गए हैं।' : 'Welcome back! You have been successfully logged in.');
    closeLoginModal();
}

async function handleCheckout(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        showToast(currentLanguage === 'hi' ? 'आपका कार्ट खाली है!' : 'Your cart is empty!', 'error');
        return;
    }
    
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Generate order ID
    const orderId = 'BK' + Date.now().toString().slice(-6);
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = calculateDiscount();
    const total = subtotal - discount;
    
    // Prepare order data
    const orderData = {
        orderId,
        items: cart,
        address,
        phone,
        paymentMethod,
        subtotal,
        discount,
        total,
        coupon: appliedCoupon?.code || null
    };
    
    // Send notification to admin
    await sendOrderNotification(orderData);
    
    // Show success message
    const successMessage = currentLanguage === 'hi' 
        ? `ऑर्डर सफलतापूर्वक दिया गया! ऑर्डर #${orderId} - आपका ऑ!डर 30 मिनट में डिलीवर किया जाएगा!`
        : `Order placed successfully! Order #${orderId} - Your order will be delivered in 30 minutes!`;
    
    showToast(successMessage);
    
    // Clear cart and coupon
    cart = [];
    appliedCoupon = null;
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

// Enhanced PWA Setup
function setupPWA() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                console.log('SW registered', reg);
                
                // Check for updates
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showToast('New version available! Refresh to update.');
                        }
                    });
                });
            })
            .catch(err => console.log('SW registration failed', err));
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
        showToast(currentLanguage === 'hi' ? 'ऐप सफलतापूर्वक इंस्टॉल हो गया!' : 'App installed successfully!');
    });
    
    // Add to home screen prompt for iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        setTimeout(() => {
            if (!window.navigator.standalone) {
                showToast('Add BukBuk to your home screen for the best experience!');
            }
        }, 3000);
    }
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

// Enhanced utility functions
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        left: 20px;
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#dc2626' : '#10b981'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1002;
        font-weight: 500;
        text-align: center;
        animation: slideInDown 0.3s ease-out;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideInDown {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInDown 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Enhanced modal closing
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Performance optimizations
// Debounce function for search/filtering
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images (if implemented)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Network status detection
window.addEventListener('online', () => {
    showToast(currentLanguage === 'hi' ? 'इंटरनेट कनेक्शन बहाल हो गया!' : 'Internet connection restored!');
});

window.addEventListener('offline', () => {
    showToast(currentLanguage === 'hi' ? 'इंटरनेट कनेक्शन नहीं है' : 'No internet connection', 'error');
});

// Auto-save cart periodically
setInterval(() => {
    if (cart.length > 0) {
        saveCart();
    }
}, 30000); // Save every 30 seconds

console.log('BukBuk Enhanced Script loaded successfully!');
