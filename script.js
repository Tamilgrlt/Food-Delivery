// Authentication Guard
(function() {
    const currentUser = localStorage.getItem('currentUser');
    const path = window.location.pathname;
    const isLoginPage = path.endsWith('login.html');
    
    if (!currentUser && !isLoginPage) {
        window.location.href = 'login.html';
    } else if (currentUser && isLoginPage) {
        window.location.href = 'index.html';
    }
})();

// Update Navigation for Logged-in Users
document.addEventListener('DOMContentLoaded', function() {
    const loginLinks = document.querySelectorAll('a[href="login.html"]');
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        loginLinks.forEach(link => {
            if (link.textContent.trim() === 'Login' || link.textContent.trim() === 'Logout') {
                link.textContent = 'Logout';
                link.href = '#';
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('currentUser');
                    alert('You have been logged out.');
                    window.location.href = 'login.html';
                });
            }
        });
    }
});

// Food data
const foodData = [
    {
        "id": 1,
        "name": "Margherita Pizza",
        "price": 299,
        "category": "pizza",
        "image": "img/food/p1.jpg",
        "description": "Delicious Margherita Pizza made with premium ingredients."
    },
    {
        "id": 2,
        "name": "Pepperoni Pizza",
        "price": 319,
        "category": "pizza",
        "image": "img/category/pizza.jpg",
        "description": "Delicious Pepperoni Pizza made with premium ingredients."
    },
    {
        "id": 3,
        "name": "Farmhouse Pizza",
        "price": 339,
        "category": "pizza",
        "image": "img/food/p2.jpg",
        "description": "Delicious Farmhouse Pizza made with premium ingredients."
    },
    {
        "id": 4,
        "name": "Spicy Paneer Pizza",
        "price": 359,
        "category": "pizza",
        "image": "img/food/pizza1 - Copy.jpg",
        "description": "Delicious Spicy Paneer Pizza made with premium ingredients."
    },
    {
        "id": 5,
        "name": "Supreme Pizza",
        "price": 379,
        "category": "pizza",
        "image": "img/food/pp2.jpg",
        "description": "Delicious Supreme Pizza made with premium ingredients."
    },
    {
        "id": 6,
        "name": "BBQ Chicken Pizza",
        "price": 399,
        "category": "pizza",
        "image": "img/category/pizza1.jpg",
        "description": "Delicious BBQ Chicken Pizza made with premium ingredients."
    },
    {
        "id": 7,
        "name": "Classic Cheeseburger",
        "price": 149,
        "category": "burger",
        "image": "img/food/b1.jpg",
        "description": "Freshly made Classic Cheeseburger with perfectly balanced flavors."
    },
    {
        "id": 8,
        "name": "BBQ Bacon Burger",
        "price": 159,
        "category": "burger",
        "image": "img/food/b2.jpg",
        "description": "Freshly made BBQ Bacon Burger with perfectly balanced flavors."
    },
    {
        "id": 9,
        "name": "Double Cheese Burger",
        "price": 169,
        "category": "burger",
        "image": "img/food/burger1 - Copy.jpg",
        "description": "Freshly made Double Cheese Burger with perfectly balanced flavors."
    },
    {
        "id": 10,
        "name": "Spicy Crispy Chicken Burger",
        "price": 179,
        "category": "burger",
        "image": "img/category/burger.jpg",
        "description": "Freshly made Spicy Crispy Chicken Burger with perfectly balanced flavors."
    },
    {
        "id": 11,
        "name": "Mushroom Swiss Burger",
        "price": 189,
        "category": "burger",
        "image": "img/food/b1.jpg",
        "description": "Freshly made Mushroom Swiss Burger with perfectly balanced flavors."
    },
    {
        "id": 12,
        "name": "Veggie Aloo Tikki Burger",
        "price": 199,
        "category": "burger",
        "image": "img/food/b2.jpg",
        "description": "Freshly made Veggie Aloo Tikki Burger with perfectly balanced flavors."
    },
    {
        "id": 13,
        "name": "Grilled Cheese Sandwich",
        "price": 129,
        "category": "sandwich",
        "image": "img/category/sandwich.jpg",
        "description": "Tasty Grilled Cheese Sandwich, toasted to perfection."
    },
    {
        "id": 14,
        "name": "Club Sandwich",
        "price": 139,
        "category": "sandwich",
        "image": "img/food/sandwich1 - Copy.jpg",
        "description": "Tasty Club Sandwich, toasted to perfection."
    },
    {
        "id": 15,
        "name": "Tuna Salad Sandwich",
        "price": 149,
        "category": "sandwich",
        "image": "img/food/s1.jpg",
        "description": "Tasty Tuna Salad Sandwich, toasted to perfection."
    },
    {
        "id": 16,
        "name": "Chicken Tikka Sandwich",
        "price": 159,
        "category": "sandwich",
        "image": "img/category/sandwich.jpg",
        "description": "Tasty Chicken Tikka Sandwich, toasted to perfection."
    },
    {
        "id": 17,
        "name": "Veggie Delight Sandwich",
        "price": 169,
        "category": "sandwich",
        "image": "img/food/sandwich1 - Copy.jpg",
        "description": "Tasty Veggie Delight Sandwich, toasted to perfection."
    },
    {
        "id": 18,
        "name": "Egg Salad Sandwich",
        "price": 179,
        "category": "sandwich",
        "image": "img/food/s1.jpg",
        "description": "Tasty Egg Salad Sandwich, toasted to perfection."
    }
];








// Cart array
let cart = [];

// DOM Elements
const cartLink = document.getElementById('cartLink');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const featuredFoods = document.getElementById('featuredFoods');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
    displayFeaturedFoods();
    updateCartUI();
    
    // Event Listeners
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    }
    closeCart.addEventListener('click', closeCartModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });
});

// Display featured foods
function displayFeaturedFoods() {
    if (!featuredFoods) return;
    
    featuredFoods.innerHTML = '';
    
    // Get first 3 items as featured
    const featuredItems = foodData.slice(0, 3);
    
    featuredItems.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
                <span class="price">₹${food.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${food.id}">Add to Cart</button>
            </div>
        `;
        featuredFoods.appendChild(foodCard);
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            addToCart(foodId);
        });
    });
}

// Add item to cart
function addToCart(foodId) {
    const food = foodData.find(item => item.id === foodId);
    
    if (food) {
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === foodId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: food.id,
                name: food.name,
                price: food.price,
                image: food.image,
                quantity: 1
            });
        }
        
        saveCartToLocalStorage();
        updateCartUI();
        
        // Show confirmation
        alert(`${food.name} added to cart!`);
    }
}

// Remove item from cart
function removeFromCart(foodId) {
    cart = cart.filter(item => item.id !== foodId);
    saveCartToLocalStorage();
    updateCartUI();
}

// Update item quantity
function updateQuantity(foodId, change) {
    const item = cart.find(item => item.id === foodId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(foodId);
        } else {
            saveCartToLocalStorage();
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart modal
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p class="item-price">₹${item.price.toFixed(2)} each</p>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <p class="item-total">₹${itemTotal.toFixed(2)}</p>
            <button class="remove-item" data-id="${item.id}">×</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
    
    // Add event listeners to cart buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            updateQuantity(foodId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            updateQuantity(foodId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            removeFromCart(foodId);
        });
    });
}

// Open cart modal
function openCart() {
    cartModal.style.display = 'flex';
}

// Close cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Menu page functions
function displayMenuFoods(category = 'all') {
    const menuFoods = document.getElementById('menuFoods');
    if (!menuFoods) return;
    
    menuFoods.innerHTML = '';
    
    const filteredFoods = category === 'all' 
        ? foodData 
        : foodData.filter(food => food.category === category);
    
    filteredFoods.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
                <span class="price">₹${food.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${food.id}">Add to Cart</button>
            </div>
        `;
        menuFoods.appendChild(foodCard);
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            addToCart(foodId);
        });
    });
}

// Filter functionality for menu page
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category and display foods
            const category = this.getAttribute('data-category');
            displayMenuFoods(category);
        });
    });
}

// Initialize menu page if on menu page
if (document.querySelector('.menu-page')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadCartFromLocalStorage();
        updateCartUI();
        displayMenuFoods();
        setupFilterButtons();
        
        // Event Listeners
        const cartLink = document.getElementById('cartLink');
        if (cartLink) {
            cartLink.addEventListener('click', function(e) {
                e.preventDefault();
                openCart();
            });
        }
        closeCart.addEventListener('click', closeCartModal);
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === cartModal) {
                closeCartModal();
            }
        });
    });
}

// Initialize about page if on about page
if (document.querySelector('.about-page')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadCartFromLocalStorage();
        updateCartUI();
        
        // Event Listeners
        const cartLink = document.getElementById('cartLink');
        if (cartLink) {
            cartLink.addEventListener('click', function(e) {
                e.preventDefault();
                openCart();
            });
        }
        closeCart.addEventListener('click', closeCartModal);
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === cartModal) {
                closeCartModal();
            }
        });
    });
}

// Initialize contact page if on contact page
if (document.querySelector('.contact-page')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadCartFromLocalStorage();
        updateCartUI();
        
        // Event Listeners
        const cartLink = document.getElementById('cartLink');
        if (cartLink) {
            cartLink.addEventListener('click', function(e) {
                e.preventDefault();
                openCart();
            });
        }
        closeCart.addEventListener('click', closeCartModal);
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === cartModal) {
                closeCartModal();
            }
        });
        
        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                // Create contact message object
                const contactMessage = {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                };
                
                // Save to localStorage
                const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
                messages.push(contactMessage);
                localStorage.setItem('contactMessages', JSON.stringify(messages));
                
                // Reset form
                contactForm.reset();
                
                // Show confirmation
                alert('Thank you for your message! We will get back to you soon.');
            });
        }
    });
}

// Initialize login page if on login page
if (document.querySelector('.login-page')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Simulate login
                localStorage.setItem('currentUser', JSON.stringify({ email: email }));
                
                // Show confirmation and redirect
                alert('Login successful! Redirecting to home page...');
                window.location.href = 'index.html';
            });
        }
    });
}

// Checkout Modal Logic
document.addEventListener('DOMContentLoaded', function() {
    // Inject Checkout HTML
    if (!document.getElementById('checkoutModal')) {
        const checkoutHTML = `
            <div class="checkout-modal" id="checkoutModal">
                <div class="checkout-content">
                    <div class="checkout-header">
                        <h2>Checkout</h2>
                        <span class="close-btn" id="closeCheckout">&times;</span>
                    </div>
                    <div class="checkout-body">
                        <div class="checkout-form-group">
                            <label>Coupon Code</label>
                            <input type="text" id="couponCode" class="checkout-input" placeholder="Enter coupon code (e.g. SAVE10)">
                        </div>
                        
                        <div class="checkout-form-group">
                            <label>Payment Method</label>
                            <div class="payment-options">
                                <div class="payment-option selected" data-method="gpay">GPay</div>
                                <div class="payment-option" data-method="phonepe">PhonePe</div>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-weight: 600;">
                            <span>Total Amount:</span>
                            <span>₹<span id="checkoutTotal">0.00</span></span>
                        </div>

                        <button class="btn-primary" id="payBtn" style="width: 100%;">Pay Now</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', checkoutHTML);
    }

    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckout = document.getElementById('closeCheckout');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const payBtn = document.getElementById('payBtn');
    const paymentOptions = document.querySelectorAll('.payment-option');
    let selectedPayment = 'gpay';
    let isCouponApplied = false;

    // Payment Selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedPayment = this.getAttribute('data-method');
        });
    });

    // Close checkout
    if (closeCheckout) {
        closeCheckout.addEventListener('click', () => {
            checkoutModal.classList.remove('active');
        });
    }

    // Connect Cart Checkout Button
    const cartCheckoutBtns = document.querySelectorAll('#checkoutBtn');
    cartCheckoutBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            // Close cart
            const cartModal = document.getElementById('cartModal');
            if (cartModal) cartModal.classList.remove('active');
            
            // Calculate total
            let total = 0;
            cart.forEach(item => total += (item.price * item.quantity));
            checkoutTotal.textContent = total.toFixed(2);
            isCouponApplied = false; // Reset coupon
            document.getElementById('couponCode').value = '';
            
            // Open Checkout
            checkoutModal.classList.add('active');
        });
    });

    // Coupon Logic (Simulate 10% discount)
    const couponInput = document.getElementById('couponCode');
    if (couponInput) {
        couponInput.addEventListener('change', function() {
            const val = this.value.trim().toUpperCase();
            if (val === 'SAVE10' && !isCouponApplied) {
                let currentTotal = parseFloat(checkoutTotal.textContent);
                currentTotal = currentTotal * 0.9;
                checkoutTotal.textContent = currentTotal.toFixed(2);
                isCouponApplied = true;
                alert('Coupon SAVE10 applied! 10% off.');
            } else if (val !== 'SAVE10' && isCouponApplied) {
                // Revert total
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                let total = 0;
                cart.forEach(item => total += (item.price * item.quantity));
                checkoutTotal.textContent = total.toFixed(2);
                isCouponApplied = false;
            }
        });
    }

    // Pay Button
    if (payBtn) {
        payBtn.addEventListener('click', function() {
            const amount = checkoutTotal.textContent;
            const method = selectedPayment === 'gpay' ? 'Google Pay' : 'PhonePe';
            
            alert(`Payment of ₹${amount} via ${method} successful!\n\nThanks for your order!`);
            
            // Clear cart
            localStorage.removeItem('cart');
            
            // Reset modals and counts
            checkoutModal.classList.remove('active');
            document.querySelectorAll('.cart-count').forEach(el => el.textContent = '0');
            const cartItemsContainer = document.getElementById('cartItems');
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
            }
            const cartTotal = document.getElementById('cartTotal');
            if (cartTotal) cartTotal.textContent = '0.00';
        });
    }
});