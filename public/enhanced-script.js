// Enhanced BukBuk Script with comprehensive upgrades

// Language support
const translations = {
    en: {
        'app-name': 'BukBuk',
        'tagline': 'Fresh Meat Delivered to Your Door',
        'login': 'Login',
        'logout': 'Logout',
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
        'welcome-subtitle': 'Ready for fresh meat delivered to your door?',
        'quick-order': 'Quick Order',
        'last-order': 'Last Order',
        'profile': 'Profile',
        'recent-order': 'Your Recent Order',
        'reorder': 'Reorder',
        'email': 'Email',
        'password': 'Password',
        'full-name': 'Full Name',
        'profile-settings': 'Profile Settings',
        'update-profile': 'Update Profile',
        'complete-order': 'Complete Your Order',
        'delivery-address': 'Delivery Address',
        'phone-number': 'Phone Number',
        'payment-method': 'Payment Method',
        'credit-card': 'Credit/Debit Card',
        'upi-payment': 'UPI Payment',
        'cash-delivery': 'Cash on Delivery',
        'place-order': 'Place Order',
        'order-confirmed': 'Order Confirmed!',
        'order-id': 'Order ID:',
        'estimated-delivery': 'Estimated Delivery:',
        'cancel-within': 'Cancel within:',
        'cancel-order': 'Cancel Order',
        'cancellation-expired': 'Cancellation period has expired - No exchanges or returns allowed',
        'cancellation-policy': 'Orders can be cancelled within 20 minutes of placing. No exchanges or returns allowed after cancellation period expires.',
        'install-title': 'Install BukBuk App',
        'install-desc': 'Get the full app experience!',
        'install': 'Install',
        'admin-settings': 'Admin Settings',
        'admin-email': 'Admin Email',
        'smtp-settings': 'SMTP Settings (Optional)',
        'sms-settings': 'SMS Settings (Twilio)',
        'save-settings': 'Save Settings',
        'enter-address': 'Enter your complete address',
        'enter-phone': 'Enter your phone number (10 digits)',
        'add-to-cart': 'Add to Cart',
        'chatbot-greeting': 'Hi! I\'m Bakku, your BukBuk assistant. How can I help you today?'
    },
    hi: {
        'app-name': 'बुकबुक',
        'tagline': 'ताज़ा मांस आपके दरवाज़े तक',
        'login': 'लॉगिन',
        'logout': 'लॉगआउट',
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
        'welcome-subtitle': 'आपके दरवाज़े पर ताज़ा मांस के लिए तैयार हैं?',
        'quick-order': 'त्वरित ऑर्डर',
        'last-order': 'पिछला ऑर्डर',
        'profile': 'प्रोफ़ाइल',
        'recent-order': 'आपका हाल का ऑर्डर',
        'reorder': 'दोबारा ऑर्डर करें',
        'email': 'ईमेल',
        'password': 'पासवर्ड',
        'full-name': 'पूरा नाम',
        'profile-settings': 'प्रोफ़ाइल सेटिंग्स',
        'update-profile': 'प्रोफ़ाइल अपडेट करें',
        'complete-order': 'अपना ऑर्डर पूरा करें',
        'delivery-address': 'डिलीवरी पता',
        'phone-number': 'फोन नंबर',
        'payment-method': 'भुगतान विधि',
        'credit-card': 'क्रेडिट/डेबिट कार्ड',
        'upi-payment': 'UPI भुगतान',
        'cash-delivery': 'डिलीवरी पर नकद',
        'place-order': 'ऑर्डर दें',
        'order-confirmed': 'ऑर्डर कन्फर्म!',
        'order-id': 'ऑर्डर ID:',
        'estimated-delivery': 'अनुमानित डिलीवरी:',
        'cancel-within': 'इसके अंदर रद्द करें:',
        'cancel-order': 'ऑर्डर रद्द करें',
        'cancellation-expired': 'रद्दीकरण की अवधि समाप्त हो गई - कोई एक्सचेंज या रिटर्न नहीं',
        'cancellation-policy': 'ऑर्डर देने के 20 मिनट के अंदर रद्द किया जा सकता है। रद्दीकरण की अवधि समाप्त होने के बाद कोई एक्सचेंज या रिटर्न नहीं।',
        'install-title': 'बुकबुक ऐप इंस्टॉल करें',
        'install-desc': 'पूरा ऐप अनुभव पाएं!',
        'install': 'इंस्टॉल करें',
        'admin-settings': 'एडमिन सेटिंग्स',
        'admin-email': 'एडमिन ईमेल',
        'smtp-settings': 'SMTP सेटिंग्स (वैकल्पिक)',
        'sms-settings': 'SMS सेटिंग्स (Twilio)',
        'save-settings': 'सेटिंग्स सेव करें',
        'enter-address': 'अपना पूरा पता दर्ज करें',
        'enter-phone': 'अपना फोन नंबर दर्ज करें (10 अंक)',
        'add-to-cart': 'कार्ट में जोड़ें',
        'chatbot-greeting': 'नमस्ते! मैं बक्कू हूं, आपका बुकबुक असिस्टेंट। आज मैं आपकी कैसे मदद कर सकता हूं?'
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

// Chatbot responses
const chatbotResponses = {
    greetings: [
        'Hello! How can I help you with your order today?',
        'Hi there! What would you like to know about our fresh meat?',
        'Welcome! I\'m here to assist you with anything you need.'
    ],
    orderHelp: [
        'I can help you place orders, track existing ones, or answer questions about our products.',
        'You can add items to cart by browsing our products section. Need help with anything specific?',
        'Our delivery takes about 30 minutes. Would you like to place an order?'
    ],
    products: [
        'We offer fresh chicken, mutton, and special cuts. All our meat is halal-certified and premium quality.',
        'Our most popular items are Chicken Curry Cut and Mutton Boneless. What type of meat are you looking for?',
        'We have various cuts available - curry cut, biryani cut, tandoori cut, and more!'
    ],
    delivery: [
        'We deliver within 30 minutes of order confirmation.',
        'Our delivery is available in select areas. You can add your address during checkout.',
        'Delivery is free for orders above ₹500!'
    ],
    cancellation: [
        'You can cancel your order within 20 minutes of placing it.',
        'After 20 minutes, cancellation is not possible as we start preparing your order.',
        'Please note our no exchange/return policy after the cancellation window.'
    ],
    fallback: [
        'I\'m not sure about that. Let me connect you to our support team.',
        'That\'s a great question! Our support team can help you better with that.',
        'I don\'t have that information right now. Would you like to speak with customer support?'
    ]
};

// App state
let cart = [];
let user = null;
let deferredPrompt = null;
let currentLanguage = 'en';
let appliedCoupon = null;
let currentOrder = null;
let cancelTimer = null;
let adminSettings = {
    email: 'admin@bukbuk.com',
    smtpHost: '',
    smtpUsername: '',
    smtpPassword: '',
    twilioSid: '',
    twilioToken: '',
    twilioPhone: ''
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadUser();
    loadProducts();
    loadCart();
    loadLanguage();
    loadAdminSettings();
    setupPWA();
    setupAdminAccess();
    updatePlaceholders();
    initializeChatbot();
});

// Enhanced User Management
function loadUser() {
    const savedUser = localStorage.getItem('bukbuk-user');
    if (savedUser) {
        user = JSON.parse(savedUser);
        showUserGreeting();
        showWelcomeSection();
        loadLastOrder();
    }
}

function showUserGreeting() {
    if (user) {
        const greeting = document.getElementById('userGreeting');
        const greetingText = greeting.querySelector('.greeting-text');
        const loginBtn = document.getElementById('loginBtn');
        
        greetingText.textContent = `Welcome back, ${user.name}! 👋`;
        greeting.classList.remove('hidden');
        loginBtn.classList.add('hidden');
    }
}

function showWelcomeSection() {
    if (user) {
        const welcomeSection = document.getElementById('welcomeSection');
        const heroSection = document.getElementById('heroSection');
        const welcomeTitle = document.getElementById('welcomeTitle');
        
        welcomeTitle.textContent = `Welcome back, ${user.name}! 👋`;
        welcomeSection.classList.remove('hidden');
        heroSection.classList.add('hidden');
    }
}

function loadLastOrder() {
    const lastOrder = localStorage.getItem('bukbuk-last-order');
    if (lastOrder && user) {
        const orderData = JSON.parse(lastOrder);
        const lastOrderSummary = document.getElementById('lastOrderSummary');
        const lastOrderItems = document.getElementById('lastOrderItems');
        const lastOrderDate = document.getElementById('lastOrderDate');
        
        lastOrderItems.innerHTML = orderData.items.map(item => 
            `<div>${currentLanguage === 'hi' ? item.nameHi : item.name} x ${item.quantity}</div>`
        ).join('');
        
        lastOrderDate.textContent = `Ordered on: ${new Date(orderData.date).toLocaleDateString()}`;
        lastOrderSummary.classList.remove('hidden');
    }
}

function scrollToProducts() {
    document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
}

function showLastOrder() {
    const lastOrderSummary = document.getElementById('lastOrderSummary');
    if (lastOrderSummary.classList.contains('hidden')) {
        loadLastOrder();
    } else {
        lastOrderSummary.classList.add('hidden');
    }
}

function reorderLast() {
    const lastOrder = localStorage.getItem('bukbuk-last-order');
    if (lastOrder) {
        const orderData = JSON.parse(lastOrder);
        cart = [...orderData.items];
        updateCartUI();
        saveCart();
        showToast('Items added to cart from your last order!');
        openCartModal();
    }
}

function openProfileModal() {
    if (user) {
        document.getElementById('profileName').value = user.name || '';
        document.getElementById('profileEmail').value = user.email || '';
        document.getElementById('profilePhone').value = user.phone || '';
        document.getElementById('profileAddress').value = user.address || '';
        document.getElementById('profileModal').classList.add('active');
    }
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.remove('active');
}

function updateProfile(event) {
    event.preventDefault();
    
    const updatedUser = {
        ...user,
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        address: document.getElementById('profileAddress').value
    };
    
    user = updatedUser;
    localStorage.setItem('bukbuk-user', JSON.stringify(user));
    
    showUserGreeting();
    showWelcomeSection();
    closeProfileModal();
    showToast('Profile updated successfully!');
}

function logout() {
    user = null;
    localStorage.removeItem('bukbuk-user');
    
    const greeting = document.getElementById('userGreeting');
    const loginBtn = document.getElementById('loginBtn');
    const welcomeSection = document.getElementById('welcomeSection');
    const heroSection = document.getElementById('heroSection');
    
    greeting.classList.add('hidden');
    loginBtn.classList.remove('hidden');
    welcomeSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
    
    showToast('Logged out successfully!');
}

// Enhanced form validation
function validateForm() {
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const phonePattern = /^[0-9]{10}$/;
    
    let isValid = true;
    
    // Validate address
    if (!address || address.length < 10) {
        showFieldError('address', 'Please enter your complete delivery address (minimum 10 characters)');
        isValid = false;
    } else {
        hideFieldError('address');
    }
    
    // Validate phone
    if (!phone || !phonePattern.test(phone)) {
        showFieldError('phone', 'Please enter a valid 10-digit phone number');
        isValid = false;
    } else {
        hideFieldError('phone');
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function hideFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    field.classList.remove('error');
    errorElement.classList.add('hidden');
}

// Enhanced order processing with notifications
async function handleCheckout(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        showToast(currentLanguage === 'hi' ? 'आपका कार्ट खाली है!' : 'Your cart is empty!', 'error');
        return;
    }
    
    if (!validateForm()) {
        return;
    }
    
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Generate order ID
    const orderId = 'BK' + Date.now().toString().slice(-6);
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = calculateDiscount();
    const total = subtotal - discount;
    
    // Create order data
    const orderData = {
        orderId,
        items: cart,
        address,
        phone,
        paymentMethod,
        subtotal,
        discount,
        total,
        coupon: appliedCoupon?.code || null,
        customerName: user?.name || 'Guest Customer',
        customerEmail: user?.email || '',
        date: new Date().toISOString()
    };
    
    // Save current order for cancellation
    currentOrder = orderData;
    localStorage.setItem('bukbuk-current-order', JSON.stringify(currentOrder));
    
    // Save as last order
    localStorage.setItem('bukbuk-last-order', JSON.stringify(orderData));
    
    // Update user profile if logged in
    if (user) {
        user.phone = phone;
        user.address = address;
        localStorage.setItem('bukbuk-user', JSON.stringify(user));
    }
    
    // Send notifications
    await sendOrderNotifications(orderData);
    
    // Show order confirmation
    showOrderConfirmation(orderData);
    
    // Clear cart and coupon
    cart = [];
    appliedCoupon = null;
    updateCartUI();
    saveCart();
    closeCheckoutModal();
}

async function sendOrderNotifications(orderData) {
    console.log('Sending order notifications...', orderData);
    
    try {
        // Send email notification
        await sendEmailNotification(orderData);
        
        // Send SMS notification (if Twilio is configured)
        if (adminSettings.twilioSid && adminSettings.twilioToken) {
            await sendSMSNotification(orderData);
        }
        
        console.log('Notifications sent successfully');
    } catch (error) {
        console.error('Failed to send notifications:', error);
    }
}

async function sendEmailNotification(orderData) {
    try {
        if (adminSettings.smtpHost && adminSettings.smtpUsername && adminSettings.smtpPassword) {
            await Email.send({
                Host: adminSettings.smtpHost,
                Username: adminSettings.smtpUsername,
                Password: adminSettings.smtpPassword,
                To: adminSettings.email,
                From: adminSettings.smtpUsername,
                Subject: `New Order #${orderData.orderId} - BukBuk`,
                Body: generateEmailBody(orderData)
            });
        } else {
            // Fallback to SMTP.js demo (limited functionality)
            await Email.send({
                SecureToken: "your-secure-token", // You'll need to configure this
                To: adminSettings.email,
                From: "noreply@bukbuk.com",
                Subject: `New Order #${orderData.orderId} - BukBuk`,
                Body: generateEmailBody(orderData)
            });
        }
        
        console.log('Email notification sent successfully');
    } catch (error) {
        console.error('Email notification failed:', error);
    }
}

async function sendSMSNotification(orderData) {
    try {
        // This would require a backend service for Twilio integration
        // For now, we'll simulate SMS sending
        const smsBody = generateSMSBody(orderData);
        console.log('SMS would be sent:', smsBody);
        
        // In a real implementation, you would call your backend SMS service here
        // const response = await fetch('/api/send-sms', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         to: adminSettings.twilioPhone,
        //         message: smsBody
        //     })
        // });
    } catch (error) {
        console.error('SMS notification failed:', error);
    }
}

function generateEmailBody(orderData) {
    const isHindi = currentLanguage === 'hi';
    return `
        <h2>New Order Received - BukBuk</h2>
        <p><strong>Order ID:</strong> ${orderData.orderId}</p>
        <p><strong>Customer:</strong> ${orderData.customerName}</p>
        <p><strong>Email:</strong> ${orderData.customerEmail}</p>
        <p><strong>Phone:</strong> ${orderData.phone}</p>
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

function generateSMSBody(orderData) {
    return `New BukBuk Order #${orderData.orderId}: ₹${orderData.total} - ${orderData.items.length} items to ${orderData.address}. Customer: ${orderData.customerName}, Phone: ${orderData.phone}`;
}

// Order confirmation and cancellation
function showOrderConfirmation(orderData) {
    document.getElementById('confirmationOrderId').textContent = orderData.orderId;
    document.getElementById('orderConfirmationModal').classList.add('active');
    startCancellationTimer();
}

function closeOrderConfirmationModal() {
    document.getElementById('orderConfirmationModal').classList.remove('active');
    if (cancelTimer) {
        clearInterval(cancelTimer);
        cancelTimer = null;
    }
}

function startCancellationTimer() {
    let timeLeft = 20 * 60; // 20 minutes in seconds
    const timerElement = document.getElementById('cancelTimer');
    const cancelBtn = document.getElementById('cancelOrderBtn');
    const timerExpired = document.getElementById('timerExpired');
    
    cancelTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(cancelTimer);
            cancelBtn.style.display = 'none';
            timerExpired.classList.remove('hidden');
            localStorage.removeItem('bukbuk-current-order');
        }
        
        timeLeft--;
    }, 1000);
}

function cancelOrder() {
    if (currentOrder) {
        localStorage.removeItem('bukbuk-current-order');
        currentOrder = null;
        
        if (cancelTimer) {
            clearInterval(cancelTimer);
            cancelTimer = null;
        }
        
        closeOrderConfirmationModal();
        showToast(currentLanguage === 'hi' ? 'ऑर्डर रद्द कर दिया गया है!' : 'Order has been cancelled!');
    }
}

// Chatbot functionality
function initializeChatbot() {
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const welcomeMessage = document.querySelector('.bot-message .message-time');
    if (welcomeMessage) {
        welcomeMessage.textContent = currentTime;
    }
}

function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotToggle = document.getElementById('chatbotToggle');
    
    if (chatbotWindow.classList.contains('hidden')) {
        chatbotWindow.classList.remove('hidden');
        chatbotToggle.style.display = 'none';
        
        // Greet user by name if logged in
        if (user) {
            const greeting = currentLanguage === 'hi' 
                ? `नमस्ते ${user.name}! मैं आपकी कैसे मदद कर सकता हूं?`
                : `Hello ${user.name}! How can I help you today?`;
            addChatMessage(greeting, 'bot');
        }
    }
}

function closeChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotToggle = document.getElementById('chatbotToggle');
    
    chatbotWindow.classList.add('hidden');
    chatbotToggle.style.display = 'flex';
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Process message and generate response
    setTimeout(() => {
        const response = generateChatbotResponse(message);
        addChatMessage(response, 'bot');
    }, 1000);
}

function addChatMessage(content, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">${content}</div>
        <div class="message-time">${currentTime}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateChatbotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Intent detection
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || 
        message.includes('नमस्ते') || message.includes('हैलो')) {
        return getRandomResponse(chatbotResponses.greetings);
    }
    
    if (message.includes('order') || message.includes('buy') || message.includes('purchase') ||
        message.includes('ऑर्डर') || message.includes('खरीद')) {
        return getRandomResponse(chatbotResponses.orderHelp);
    }
    
    if (message.includes('chicken') || message.includes('mutton') || message.includes('meat') ||
        message.includes('चिकन') || message.includes('मटन') || message.includes('मांस')) {
        return getRandomResponse(chatbotResponses.products);
    }
    
    if (message.includes('delivery') || message.includes('time') || message.includes('fast') ||
        message.includes('डिलीवरी') || message.includes('समय')) {
        return getRandomResponse(chatbotResponses.delivery);
    }
    
    if (message.includes('cancel') || message.includes('return') || message.includes('refund') ||
        message.includes('रद्द') || message.includes('वापस')) {
        return getRandomResponse(chatbotResponses.cancellation);
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('₹') ||
        message.includes('कीमत') || message.includes('दाम')) {
        return 'Our prices are very competitive! Chicken starts from ₹320/kg and Mutton from ₹820/kg. Check our products section for detailed pricing.';
    }
    
    if (message.includes('help') || message.includes('support') || message.includes('problem') ||
        message.includes('मदद') || message.includes('सहायता')) {
        return 'I\'m here to help! You can ask me about our products, delivery, orders, or anything else. What would you like to know?';
    }
    
    // Fallback response
    return getRandomResponse(chatbotResponses.fallback);
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

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
                        <span class="product-unit">per ${isHindi ? product.unitHi : product.unit}</span>
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
    if (cartSubtotal) cartSubtotal.textContent = subtotal;
    cartTotal.textContent = finalTotal;
    if (checkoutTotal) checkoutTotal.textContent = finalTotal;
    
    // Show/hide discount row
    if (discount > 0 && discountRow) {
        discountAmount.textContent = discount;
        discountRow.style.display = 'flex';
    } else if (discountRow) {
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
        const couponSection = document.getElementById('couponSection');
        if (couponSection) couponSection.style.display = 'none';
    } else {
        const isHindi = currentLanguage === 'hi';
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${isHindi ? item.nameHi : item.name}</div>
                    <div class="cart-item-price">₹${item.price} per ${isHindi ? item.unitHi : item.unit}</div>
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
        const couponSection = document.getElementById('couponSection');
        if (couponSection) couponSection.style.display = 'block';
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
            const couponCodeInput = document.getElementById('couponCode');
            const applyButton = document.querySelector('[data-key="apply-coupon"]');
            if (couponCodeInput && applyButton) {
                couponCodeInput.value = appliedCoupon.code;
                couponCodeInput.disabled = true;
                applyButton.textContent = 'Applied';
                applyButton.disabled = true;
                showCouponMessage(`Coupon ${appliedCoupon.code} is active`, 'success');
            }
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
    if (user && user.phone && user.address) {
        document.getElementById('address').value = user.address;
        document.getElementById('phone').value = user.phone;
    }
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
        const adminEmail = document.getElementById('adminEmail');
        const smtpHost = document.getElementById('smtpHost');
        const smtpUsername = document.getElementById('smtpUsername');
        const smtpPassword = document.getElementById('smtpPassword');
        const twilioSid = document.getElementById('twilioSid');
        const twilioToken = document.getElementById('twilioToken');
        const twilioPhone = document.getElementById('twilioPhone');
        
        if (adminEmail) adminEmail.value = adminSettings.email;
        if (smtpHost) smtpHost.value = adminSettings.smtpHost;
        if (smtpUsername) smtpUsername.value = adminSettings.smtpUsername;
        if (smtpPassword) smtpPassword.value = adminSettings.smtpPassword;
        if (twilioSid) twilioSid.value = adminSettings.twilioSid;
        if (twilioToken) twilioToken.value = adminSettings.twilioToken;
        if (twilioPhone) twilioPhone.value = adminSettings.twilioPhone;
    }
}

function saveAdminSettings() {
    adminSettings = {
        email: document.getElementById('adminEmail').value,
        smtpHost: document.getElementById('smtpHost').value,
        smtpUsername: document.getElementById('smtpUsername').value,
        smtpPassword: document.getElementById('smtpPassword').value,
        twilioSid: document.getElementById('twilioSid').value,
        twilioToken: document.getElementById('twilioToken').value,
        twilioPhone: document.getElementById('twilioPhone').value
    };
    
    localStorage.setItem('bukbuk-admin', JSON.stringify(adminSettings));
    showToast('Admin settings saved successfully!');
    closeAdminModal();
}

// Form handlers
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('userName').value;
    
    // Create user object
    user = { 
        email, 
        name,
        phone: '',
        address: '',
        loginDate: new Date().toISOString()
    };
    
    localStorage.setItem('bukbuk-user', JSON.stringify(user));
    
    showUserGreeting();
    showWelcomeSection();
    closeLoginModal();
    showToast(currentLanguage === 'hi' ? `स्वागत है ${name}! आप सफलतापूर्वक लॉग इन हो गए हैं।` : `Welcome ${name}! You have been successfully logged in.`);
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
        navigator.serviceWorker.register('/enhanced-sw.js')
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
        
        // Close chatbot if open
        const chatbotWindow = document.getElementById('chatbotWindow');
        if (!chatbotWindow.classList.contains('hidden')) {
            closeChatbot();
        }
    }
});

// Performance optimizations
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

// Check for current order on page load
window.addEventListener('load', () => {
    const currentOrderData = localStorage.getItem('bukbuk-current-order');
    if (currentOrderData) {
        currentOrder = JSON.parse(currentOrderData);
        showToast('You have an active order that can still be cancelled!');
    }
});

console.log('BukBuk Enhanced Script loaded successfully!');
