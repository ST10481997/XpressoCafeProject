//Order Online
// Menu items data with prices
const menuItems = {
    "Coffees": [
        { name: "Espresso", price: 14 },
        { name: "Cappuccino", price: 14 },
        { name: "Café Latte", price: 14 },
        { name: "Americano", price: 14 },
        { name: "Double Espresso", price: 14 },
        { name: "Macchiato", price: 14 },
        { name: "Flat White", price: 14 },
        { name: "Hazelnut Delight", price: 14 },
        { name: "Hazelnut Cappuccino", price: 14 },
        { name: "Toffee Caramel Latte", price: 14 },
        { name: "Toffee Caramel Dream", price: 14 },
        { name: "Hot Chocolate", price: 14 },
        { name: "White Hot Chocolate", price: 14 },
        { name: "Top Deck Hot Chocolate", price: 14 },
        { name: "Salted Caramel Hottie", price: 14 }
    ],
    "Teas": [
        { name: "Chai Latte", price: 14 },
        { name: "Dirty Chai Latte", price: 14 },
        { name: "Rooibos Tea", price: 14 },
        { name: "Five Roses English Tea", price: 14 }
    ],
    "Cold Drinks": [
        { name: "Fresh Juices Daily", price: 14 },
        { name: "Canned Drinks", price: 14 },
        { name: "Water Still/Sparkling", price: 14 },
        { name: "Ice Coffee", price: 14 },
        { name: "Mango Slushy", price: 14 },
        { name: "Strawberry Slushy", price: 14 },
        { name: "Sparkling Refresher", price: 14 },
        { name: "Popping Boba", price: 14 }
    ],
    "Pastries": [
        { name: "Custard Danish", price: 14 },
        { name: "Apple Danish", price: 14 },
        { name: "Cinnamon Choc Twist", price: 14 },
        { name: "Plain Croissant", price: 14 },
        { name: "Custard Croissant", price: 14 },
        { name: "Vegetable Quiche", price: 14 },
        { name: "Chicken & Mushroom Quiche", price: 14 },
        { name: "Chicken & Mushroom Pie", price: 14 },
        { name: "Spinach & Feta Pie", price: 14 },
        { name: "Boerie Roll", price: 14 },
        { name: "Thai Twist", price: 14 },
        { name: "Custard Copenhagen", price: 14 },
        { name: "Vetkoek", price: 14 },
        { name: "Pepper Steak Pie", price: 14 }
    ],
    "Sweet Treats": [
        { name: "Chocolate Doughnut", price: 14 },
        { name: "Decadent Brownies", price: 14 },
        { name: "Muffins", price: 14 },
        { name: "Caramel Doughnut", price: 14 },
        { name: "Chocolate Mousse Cronut", price: 14 },
        { name: "Big Cookies *Selected Stores", price: 14 },
        { name: "Hetzoggie *Selected Stores", price: 14 },
        { name: "Custard Cronut *Selected Stores", price: 14 },
        { name: "French Doughnut *Selected Stores", price: 14 }
    ],
    "Sandwiches": [
        { name: "Chicken Salad", price: 14 },
        { name: "Garlic Knot (Vegan)", price: 14 }
    ], 
    "Other":[
        { name: " Droëwors", price: 14 },
        { name: "Oats Cup", price: 14 }
    ]
};

let cart = [];
let currentSelectedItem = null;

// DOM elements
const categoryDropdowns = document.getElementById('category-dropdowns');
const selectedItemDisplay = document.getElementById('selected-item');
const selectedItemName = document.getElementById('selected-item-name');
const itemInput = document.getElementById('item');
const orderForm = document.getElementById('order-form');
const orderSummary = document.getElementById('order-summary');
const orderTotal = document.getElementById('order-total');
const addToCartBtn = document.getElementById('add-to-cart');
const quantityInput = document.getElementById('quantity');

// Modal elements
const checkoutModal = document.getElementById('checkout-modal');
const confirmationModal = document.getElementById('confirmation-modal');

// Initialize the category dropdowns
function initializeCategoryDropdowns() {
    for (const category in menuItems) {
        const dropdown = document.createElement('div');
        dropdown.className = 'category-dropdown';
        
        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `
            ${category}
            <i class="fas fa-chevron-down"></i>
        `;
        
        const itemsList = document.createElement('div');
        itemsList.className = 'items-list';
        
        // Add items to the list
        menuItems[category].forEach(item => {
            const itemOption = document.createElement('div');
            itemOption.className = 'item-option';
            itemOption.innerHTML = `
                <div>${item.name}</div>
                <div style="color: #6f4e37; font-size: 0.9rem;">R ${item.price.toFixed(2)}</div>
            `;
            
            itemOption.addEventListener('click', () => {
                // Remove selected class from all items
                document.querySelectorAll('.item-option').forEach(option => {
                    option.classList.remove('selected');
                });
                
                // Add selected class to clicked item
                itemOption.classList.add('selected');
                
                // Store current selected item
                currentSelectedItem = {
                    name: item.name,
                    price: item.price,
                    category: category
                };
                
                // Update selected item display
                selectedItemName.textContent = `${item.name} - R ${item.price.toFixed(2)}`;
                selectedItemDisplay.classList.add('show');
            });
            
            itemsList.appendChild(itemOption);
        });
        
        // Toggle dropdown on header click
        header.addEventListener('click', () => {
            const isActive = header.classList.contains('active');
            
            // Close all dropdowns
            document.querySelectorAll('.category-header').forEach(h => {
                h.classList.remove('active');
            });
            document.querySelectorAll('.items-list').forEach(list => {
                list.classList.remove('show');
            });
            
            // Open this dropdown if it wasn't active
            if (!isActive) {
                header.classList.add('active');
                itemsList.classList.add('show');
            }
        });
        
        dropdown.appendChild(header);
        dropdown.appendChild(itemsList);
        categoryDropdowns.appendChild(dropdown);
    }
}

/// Add item to cart
function addToCart() {
    if (!currentSelectedItem) {
        alert('Please select an item first.');
        return;
    }
    
    // Use default quantity of 1 since we removed the quantity input
    const quantity = 1;
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.name === currentSelectedItem.name);
    
    if (existingItemIndex > -1) {
        // Update quantity if item already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            ...currentSelectedItem,
            quantity: quantity
        });
    }
    
    // Update order summary
    updateOrderSummary();
    
    // Reset selection
    document.querySelectorAll('.item-option').forEach(option => {
        option.classList.remove('selected');
    });
    selectedItemDisplay.classList.remove('show');
    currentSelectedItem = null;
    
    // Show order summary
    orderSummary.classList.add('show');
}



// Update order summary
function updateOrderSummary() {
    const summaryContent = document.getElementById('summary-content');
    let total = 0;
    
    if (cart.length === 0) {
        summaryContent.innerHTML = '<p>No items selected</p>';
        orderTotal.textContent = 'R 0.00';
        return;
    }
    
    summaryContent.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">R ${item.price.toFixed(2)} each</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
            <div class="item-total">R ${itemTotal.toFixed(2)}</div>
        `;
        
        summaryContent.appendChild(cartItem);
    });
    
    orderTotal.textContent = `R ${total.toFixed(2)}`;
}

// Cart management functions
function increaseQuantity(index) {
    cart[index].quantity++;
    updateOrderSummary();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateOrderSummary();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateOrderSummary();
    
    if (cart.length === 0) {
        orderSummary.classList.remove('show');
    }
}

// Open checkout modal
function openCheckout() {
    if (cart.length === 0) {
        alert('Please add items to your cart before proceeding to checkout.');
        return false;
    }
    
    // Update checkout summary
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    let total = 0;
    
    checkoutItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <div>${item.name} x ${item.quantity}</div>
            <div>R ${itemTotal.toFixed(2)}</div>
        `;
        
        checkoutItems.appendChild(checkoutItem);
    });
    
    checkoutTotal.textContent = `R ${total.toFixed(2)}`;
    
    // Update customer info
    document.getElementById('checkout-name').textContent = document.getElementById('name').value;
    document.getElementById('checkout-phone').textContent = document.getElementById('phone').value;
    
    // Show checkout modal
    checkoutModal.classList.add('show');
    
    return false;
}

// Close checkout modal
function closeCheckout() {
    checkoutModal.classList.remove('show');
}

// Confirm order
function confirmOrder() {
    const pickupTime = document.getElementById('pickup-time').value;
    
    if (!pickupTime) {
        alert('Please select a pickup time.');
        return;
    }
    
    // Generate order reference
    const orderReference = 'XP' + Date.now().toString().slice(-6);
    
    // Update confirmation modal
    document.getElementById('confirm-name').textContent = document.getElementById('name').value;
    document.getElementById('confirm-time').textContent = pickupTime;
    document.getElementById('order-reference').textContent = orderReference;
    
    const confirmItems = document.getElementById('confirm-items');
    const confirmTotal = document.getElementById('confirm-total');
    let total = 0;
    
    confirmItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const confirmItem = document.createElement('div');
        confirmItem.className = 'checkout-item';
        confirmItem.innerHTML = `
            <div>${item.name} x ${item.quantity}</div>
            <div>R ${itemTotal.toFixed(2)}</div>
        `;
        
        confirmItems.appendChild(confirmItem);
    });
    
    confirmTotal.textContent = `R ${total.toFixed(2)}`;
    
    // Close checkout modal and open confirmation
    checkoutModal.classList.remove('show');
    confirmationModal.classList.add('show');
}

// Start new order
function startNewOrder() {
    // Reset everything
    cart = [];
    currentSelectedItem = null;
    
    // Reset form
    orderForm.reset();
    selectedItemDisplay.classList.remove('show');
    orderSummary.classList.remove('show');
    document.querySelectorAll('.item-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Close confirmation modal
    confirmationModal.classList.remove('show');
}

// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeCategoryDropdowns();
    
    // Add to cart button
    addToCartBtn.addEventListener('click', addToCart);
    
    // Form submission (proceed to checkout)
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        openCheckout();
    });
});


//Contact us and Store Locator
//Store search

// Store search functionality
function initializeStoreSearch() {
    const searchInput = document.getElementById('storeSearch');
    const storeCards = document.querySelectorAll('.store-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        let foundResults = false;
        
        storeCards.forEach(card => {
            const storeName = card.querySelector('h3').textContent.toLowerCase();
            const storeAddress = card.querySelector('p').textContent.toLowerCase();
            const storeInfo = storeName + ' ' + storeAddress;
            
            if (storeInfo.includes(searchTerm)) {
                card.style.display = 'block';
                foundResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show all cards if search is empty
        if (searchTerm === '') {
            storeCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    });
}

// Tab functionality
function initializeTabs() {
    const tabInputs = document.querySelectorAll('input[name="province"]');
    
    tabInputs.forEach(tab => {
        tab.addEventListener('change', function() {
            // The CSS will handle showing/hiding the appropriate content
            // based on the :checked pseudo-class
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeStoreSearch();
    initializeTabs();
});

// Gallery Lightbox functionality
let currentImageIndex = 0;
const images = [
    { src: 'Figure7.jpg', caption: 'Sweet Treats' },
    { src: 'Figure13.jpg', caption: 'Sandwiches' },
    { src: 'Figure4.jpg', caption: 'Coffee' },
    { src: 'Figure10.jpg', caption: 'Cinnamon Choc Twist' },
    { src: 'Figure6.jpg', caption: 'Juice' },
    { src: 'Figure11.jpg', caption: 'Oats Cup' },
    { src: 'Figure16.jpg', caption: 'Our Stores' },
    { src: 'Figure5.jpg', caption: 'Juice' },
    { src: 'Figure12.jpg', caption: 'Chocolate Doughnuts' },
    { src: 'Figure9.jpg', caption: 'Beverages' },
    { src: 'Figure14.jpg', caption: 'Oats Cup' },
    { src: 'Figure17.jpg', caption: 'Our Stores' },
    { src: 'Figure15.jpg', caption: 'Pastries' },
    { src: 'Figure1.jpeg', caption: 'Muesli & Yogurt' },
    { src: 'Figure3.jpg', caption: 'Muffins' },
    { src: 'Figure2.jpeg', caption: 'Sandwiches' }
];

function openLightbox(index) {
    console.log('Opening lightbox with index:', index); // Debug log
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
        lightbox.classList.add('active');
        
        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Lightbox elements not found!');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Loop around if at ends
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightboxImg && lightboxCaption) {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox && lightbox.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                changeImage(-1);
                break;
            case 'ArrowRight':
                changeImage(1);
                break;
        }
    }
});

// Close lightbox when clicking on overlay (but not content)
document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active') && e.target === lightbox) {
        closeLightbox();
    }
});

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery page loaded'); // Debug log
    
    // Check if we're on the gallery page
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        console.log('Gallery grid found, initializing lightbox...');
        
        // Add click event listeners to all gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.cursor = 'pointer';
            console.log(`Gallery item ${index} ready`);
        });
    }
    
    // Your existing initialization code
    if (typeof initializeStoreSearch === 'function') initializeStoreSearch();
    if (typeof initializeTabs === 'function') initializeTabs();
    if (typeof initializeSidebar === 'function') initializeSidebar();
    if (typeof initializeMenuSearch === 'function') initializeMenuSearch();
});

//Enquiries
// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("LbJJ6gh3rUtBx850v"); // Replace with your actual public key
})();

// Initialize enquiry form when page loads
document.addEventListener('DOMContentLoaded', function() {
    const enquiryForm = document.getElementById('enquiryForm');
    const enquiryType = document.getElementById('enquiryType');
    
    if (enquiryForm && enquiryType) {
        console.log('Enquiry form initialized');
        
        // Dynamic form fields based on enquiry type
        enquiryType.addEventListener('change', function() {
            const eventDetails = document.getElementById('eventDetails');
            const guestsField = document.getElementById('guestsField');
            
            // Hide all conditional fields first
            if (eventDetails) {
                eventDetails.style.display = 'none';
                // Remove required attribute when hidden
                const eventDateInput = document.getElementById('eventDate');
                if (eventDateInput) eventDateInput.required = false;
            }
            if (guestsField) {
                guestsField.style.display = 'none';
                // Remove required attribute when hidden
                const guestsInput = document.getElementById('guests');
                if (guestsInput) guestsInput.required = false;
            }
            
            // Show relevant fields based on selection
            if (this.value === 'events' || this.value === 'catering') {
                // Show event date for BOTH events and catering
                if (eventDetails) {
                    eventDetails.style.display = 'block';
                    const eventDateInput = document.getElementById('eventDate');
                    if (eventDateInput) {
                        eventDateInput.required = true;
                        // Set minimum date to today
                        const today = new Date().toISOString().split('T')[0];
                        eventDateInput.min = today;
                    }
                }
                // Show guests field for BOTH events and catering
                if (guestsField) {
                    guestsField.style.display = 'block';
                    const guestsInput = document.getElementById('guests');
                    if (guestsInput) guestsInput.required = true;
                }
            }
        });

        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateEnquiryForm()) {
                sendEnquiryEmail();
            }
        });

        enquiryForm.addEventListener('reset', function() {
            clearErrors();
            // Hide conditional fields when form is reset
            const eventDetails = document.getElementById('eventDetails');
            const guestsField = document.getElementById('guestsField');
            if (eventDetails) eventDetails.style.display = 'none';
            if (guestsField) guestsField.style.display = 'none';
        });

        // Real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const eventDateInput = document.getElementById('eventDate');
        const guestsInput = document.getElementById('guests');
        
        if (nameInput) nameInput.addEventListener('blur', validateName);
        if (emailInput) emailInput.addEventListener('blur', validateEmail);
        if (messageInput) messageInput.addEventListener('blur', validateMessage);
        if (eventDateInput) eventDateInput.addEventListener('blur', validateEventDate);
        if (guestsInput) guestsInput.addEventListener('blur', validateGuests);
    }
});

function validateEnquiryForm() {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Name validation
    const name = document.getElementById('name');
    if (name && name.value.length < 2) {
        document.getElementById('nameError').textContent = "Name must be at least 2 characters.";
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email');
    if (email && !email.validity.valid) {
        document.getElementById('emailError').textContent = "Please enter a valid email address.";
        isValid = false;
    }
    
    // Enquiry type validation
    const enquiryType = document.getElementById('enquiryType');
    if (enquiryType && !enquiryType.value) {
        document.getElementById('typeError').textContent = "Please select an enquiry type.";
        isValid = false;
    }
    
    // Event date validation - for BOTH events and catering
    const enquiryTypeValue = enquiryType ? enquiryType.value : '';
    const eventDate = document.getElementById('eventDate');
    if ((enquiryTypeValue === 'events' || enquiryTypeValue === 'catering') && eventDate) {
        if (!eventDate.value) {
            document.getElementById('eventDateError').textContent = "Please select a preferred event date.";
            isValid = false;
        } else if (eventDate.value) {
            const selectedDate = new Date(eventDate.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set to beginning of today
            
            if (selectedDate < today) {
                document.getElementById('eventDateError').textContent = "Please select a future date for your event.";
                isValid = false;
            }
        }
    }
    
    // Guests validation - for BOTH events and catering
    const guests = document.getElementById('guests');
    if ((enquiryTypeValue === 'events' || enquiryTypeValue === 'catering') && guests) {
        if (!guests.value || guests.value < 1) {
            document.getElementById('guestsError').textContent = "Please enter the number of guests (minimum 1).";
            isValid = false;
        }
    }
    
    // Message validation
    const message = document.getElementById('message');
    if (message && message.value.length < 10) {
        document.getElementById('messageError').textContent = "Please provide more details (at least 10 characters).";
        isValid = false;
    }
    
    return isValid;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function sendEnquiryEmail() {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone')?.value || 'Not provided',
        enquiry_type: document.getElementById('enquiryType').value,
        event_date: document.getElementById('eventDate')?.value || 'N/A',
        guests: document.getElementById('guests')?.value || 'N/A',
        message: document.getElementById('message').value,
        submission_date: new Date().toLocaleString()
    };
    
    // Send email via EmailJS
    emailjs.send("service_tn9mwxv", "template_tv0dtvw", formData)
    .then(function(response) {
        console.log('Email sent successfully:', response);
        showEnquiryResponse(formData);
    }, function(error) {
        console.error('EmailJS Error:', error);
        // Even if email fails, show success to user
        showEnquiryResponse(formData);
    })
    .finally(function() {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

function showEnquiryResponse(formData) {
    // Hide form and show response
    const enquiryForm = document.getElementById('enquiryForm');
    const responseContainer = document.getElementById('enquiryResponse');
    const responseDetails = document.getElementById('responseDetails');
    
    if (enquiryForm) enquiryForm.style.display = 'none';
    if (responseContainer) responseContainer.style.display = 'block';
    
    if (!responseDetails) return;
    
    // Generate response based on enquiry type
    let responseHTML = '';
    switch(formData.enquiry_type) {
        case 'catering':
            responseHTML = `
                <p><strong>Catering Services Enquiry</strong></p>
                <p>Thank you for your interest in our catering services! Our catering manager will contact you within 24 hours to discuss your requirements.</p>
                <p><strong>Event Date:</strong> ${formData.event_date}</p>
                <p><strong>Number of Guests:</strong> ${formData.guests}</p>
                <p><strong>Estimated Response Time:</strong> 24 hours</p>
                <p><strong>Minimum Order:</strong> R500 for delivery</p>
            `;
            break;
        case 'events':
            responseHTML = `
                <p><strong>Event Hosting Enquiry</strong></p>
                <p>We're excited about your event! Our events coordinator will check availability and contact you within 24 hours.</p>
                <p><strong>Event Date:</strong> ${formData.event_date}</p>
                <p><strong>Number of Guests:</strong> ${formData.guests}</p>
                <p><strong>Estimated Response Time:</strong> 24 hours</p>
                <p><strong>Capacity:</strong> Up to 50 guests</p>
            `;
            break;
        case 'wholesale':
            responseHTML = `
                <p><strong>Wholesale Coffee Beans Enquiry</strong></p>
                <p>Thank you for your interest in our wholesale coffee beans! Our sales team will send you pricing and availability within 24 hours.</p>
                <p><strong>Estimated Response Time:</strong> 24 hours</p>
                <p><strong>Minimum Order:</strong> 5kg per variety</p>
            `;
            break;
        case 'membership':
            responseHTML = `
                <p><strong>Coffee Club Membership Enquiry</strong></p>
                <p>Welcome to our coffee community! We'll send you membership details and benefits within 24 hours.</p>
                <p><strong>Estimated Response Time:</strong> 24 hours</p>
                <p><strong>Membership Benefits:</strong> 10% discount, free workshops, exclusive blends</p>
            `;
            break;
        default:
            responseHTML = `
                <p>Thank you for your enquiry! We have received your message and will respond within 24 hours.</p>
                <p><strong>Reference Number:</strong> XC${Date.now().toString().slice(-6)}</p>
            `;
    }
    
    responseDetails.innerHTML = responseHTML;
}

function resetForm() {
    const responseContainer = document.getElementById('enquiryResponse');
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (responseContainer) responseContainer.style.display = 'none';
    if (enquiryForm) {
        enquiryForm.style.display = 'block';
        enquiryForm.reset();
    }
    
    clearErrors();
    
    // Hide conditional fields
    const eventDetails = document.getElementById('eventDetails');
    const guestsField = document.getElementById('guestsField');
    if (eventDetails) eventDetails.style.display = 'none';
    if (guestsField) guestsField.style.display = 'none';
}

// Validation functions
function validateName() {
    const name = document.getElementById('name');
    const error = document.getElementById('nameError');
    if (!name || !error) return;
    
    if (name.value.length < 2) {
        error.textContent = "Name must be at least 2 characters.";
    } else {
        error.textContent = "";
    }
}

function validateEmail() {
    const email = document.getElementById('email');
    const error = document.getElementById('emailError');
    if (!email || !error) return;
    
    if (!email.validity.valid) {
        error.textContent = "Please enter a valid email address.";
    } else {
        error.textContent = "";
    }
}

function validateMessage() {
    const message = document.getElementById('message');
    const error = document.getElementById('messageError');
    if (!message || !error) return;
    
    if (message.value.length < 10) {
        error.textContent = "Message must be at least 10 characters.";
    } else {
        error.textContent = "";
    }
}

function validateEventDate() {
    const eventDate = document.getElementById('eventDate');
    const error = document.getElementById('eventDateError');
    const enquiryType = document.getElementById('enquiryType');
    
    if (!eventDate || !error || !enquiryType) return;
    
    // Only validate if events or catering is selected and field is visible
    if ((enquiryType.value === 'events' || enquiryType.value === 'catering') && eventDate.style.display !== 'none') {
        if (!eventDate.value) {
            error.textContent = "Please select a preferred event date.";
        } else {
            const selectedDate = new Date(eventDate.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                error.textContent = "Please select a future date for your event.";
            } else {
                error.textContent = "";
            }
        }
    } else {
        error.textContent = "";
    }
}

function validateGuests() {
    const guests = document.getElementById('guests');
    const error = document.getElementById('guestsError');
    const enquiryType = document.getElementById('enquiryType');
    
    if (!guests || !error || !enquiryType) return;
    
    // Only validate if events or catering is selected and field is visible
    if ((enquiryType.value === 'events' || enquiryType.value === 'catering') && guests.style.display !== 'none') {
        if (!guests.value || guests.value < 1) {
            error.textContent = "Please enter the number of guests (minimum 1).";
        } else {
            error.textContent = "";
        }
    } else {
        error.textContent = "";
    }
}

//hamnurger
// Toggle mobile menu function
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('show');
    }
}

// Close menu when clicking on a link (mobile)
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-links');
            if (navMenu && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });

});
