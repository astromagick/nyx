const productDatabase = [ // preset data table for each item when displaying cart items
    {
        id: "zero_indigo",
        name: "ZERO (indigo)",
        type: "Water Bottle",
        description: "The ZERO bottle is an insulated matte plastic drinking bottle inspired off the aesthetics of a rocket. It is intricately designed to keep your drink cool / hot and drinkable irrespective of its environment! (in space or on Earth!) Its design is modern and unique, and can easily be reused and cleaned through its shaft at the bottom.",
        price: 50.00,
        imageSrc: "../asset/PNG/zero-indigo.png",
        imageAlt: "ZERO Water Bottle (indigo)",
        productUrl: "../404.html"
    },
    {
        id: "zero_spacegrey",
        name: "ZERO (space grey)",
        type: "Water Bottle",
        description: "The ZERO bottle is an insulated matte plastic drinking bottle inspired off the aesthetics of a rocket. It is intricately designed to keep your drink cool / hot and drinkable irrespective of its environment! (in space or on Earth!) Its design is modern and unique, and can easily be reused and cleaned through its shaft at the bottom.",
        price: 50.00,
        imageSrc: "../asset/PNG/zero-spacegrey.png",
        imageAlt: "ZERO Water Bottle (space grey)",
        productUrl: "../404.html"
    },
    {
        id: "zero_ultra",
        name: "ZERO (ultra)",
        type: "Water Bottle",
        description: "The ZERO bottle is an insulated matte plastic drinking bottle inspired off the aesthetics of a rocket. It is intricately designed to keep your drink cool / hot and drinkable irrespective of its environment! (in space or on Earth!) Its design is modern and unique, and can easily be reused and cleaned through its shaft at the bottom.",
        price: 50.00,
        imageSrc: "../asset/PNG/zero-ultra.png",
        imageAlt: "ZERO Water Bottle (ultra)",
        productUrl: "../404.html"
    },
    {
        id: "zero_minty",
        name: "ZERO (minty)",
        type: "Water Bottle",
        description: "The ZERO bottle is an insulated matte plastic drinking bottle inspired off the aesthetics of a rocket. It is intricately designed to keep your drink cool / hot and drinkable irrespective of its environment! (in space or on Earth!) Its design is modern and unique, and can easily be reused and cleaned through its shaft at the bottom.",
        price: 50.00,
        imageSrc: "../asset/PNG/zero-minty.png",
        imageAlt: "ZERO Water Bottle (minty)",
        productUrl: "../404.html"
    },
    {
        id: "zero_pink",
        name: "ZERO (pink)",
        type: "Water Bottle",
        description: "The ZERO bottle is an insulated matte plastic drinking bottle inspired off the aesthetics of a rocket. It is intricately designed to keep your drink cool / hot and drinkable irrespective of its environment! (in space or on Earth!) Its design is modern and unique, and can easily be reused and cleaned through its shaft at the bottom.",
        price: 50.00,
        imageSrc: "../asset/PNG/zero-pink.png",
        imageAlt: "ZERO Water Bottle (pink)",
        productUrl: "../404.html"
    },
    {
        id: "astronomer+/m",
        name: "Astronomer+ (1 month)",
        type: "Subscription",
        description: "nyx Astronomer+ is a subscription which provides many benefits to the nyx Astronomers Platform. It includes: a badge next to your name on posts, 2TB cloud storage for photos and other files, access to our most advanced tools yet, and more!",
        price: 4.99,
        imageSrc: "../asset/PNG/favicon4.png",
        imageAlt: "Astronomer+ (1 month)",
        productUrl: "../404.html"
    },
    {
        id: "astronomer+/y",
        name: "Astronomer+ (1 year)",
        type: "Subscription",
        description: "nyx Astronomer+ is a subscription which provides many benefits to the nyx Astronomers Platform. It includes: a badge next to your name on posts, 2TB cloud storage for photos and other files, access to our most advanced tools yet, and more!",
        price: 49.99,
        imageSrc: "../asset/PNG/favicon4.png",
        imageAlt: "Astronomer+ (1 year)",
        productUrl: "../404.html"
    },
    {
        id: "astronomerx/m",
        name: "AstronomerX (1 month)",
        type: "Subscription",
        description: "nyx AstronomerX is a subscription which provides many benefits to the nyx Astronomers Platform. It includes: a badge next to your name on posts, 2TB cloud storage for photos and other files, access to our most advanced tools yet, and more!",
        price: 8.99,
        imageSrc: "../asset/PNG/favicon3.png",
        imageAlt: "AstronomerX (1 month)",
        productUrl: "../404.html"
    },
    {
        id: "astronomerx/y",
        name: "AstronomerX (1 year)",
        type: "Subscription",
        description: "nyx AstronomerX is a subscription which provides many benefits to the nyx Astronomers Platform. It includes: a badge next to your name on posts, 2TB cloud storage for photos and other files, access to our most advanced tools yet, and more!",
        price: 79.99,
        imageSrc: "../asset/PNG/favicon3.png",
        imageAlt: "AstronomerX (1 year)",
        productUrl: "../404.html"
    },
];

document.addEventListener("DOMContentLoaded", () => {
    updateGlobalCartCount();

    const addToCartButtons = document.querySelectorAll('.addToCart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id; 
            addToCart(id);
        });
    });

    const cartContainer = document.getElementById('cartContainer');
    if (cartContainer) {
        renderCartPage();
    }
});

function getCart() {
    return JSON.parse(localStorage.getItem('shopCart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('shopCart', JSON.stringify(cart));
    updateGlobalCartCount();
}

function addToCart(id) {
    let cart = getCart();
    let existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: id, quantity: 1 });
    }
    saveCart(cart);

    // toasts functs when cart actions
    const dbProduct = productDatabase.find(p => p.id === id);
    if (dbProduct) {
        showNotification(`Added ${dbProduct.name} to cart`);
    } else {
        showNotification(`Item added to cart`);// fallback just in case
    }
}

function updateGlobalCartCount() {
    let cart = getCart();
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    document.querySelectorAll('.cartCount').forEach(badge => {
        badge.innerText = totalItems;
    });
}

function renderCartPage() {
    
    const container = document.getElementById('cartContainer');
    let cart = getCart();
    container.innerHTML = ''; 

    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="color:white;">Your cart is currently empty.</p>';
        updateCartTotals(0, 0);
        return;
    }

    cart.forEach(cartItem => {
        const dbProduct = productDatabase.find(p => p.id === cartItem.id); // get the preset from hte table and apply it to the newly created item container
        
        if (dbProduct) {
            totalItems += cartItem.quantity;
            totalPrice += (dbProduct.price * cartItem.quantity);
            
            const article = document.createElement('article');
            article.innerHTML = `
                <a href="${dbProduct.productUrl}">
                    <img src="${dbProduct.imageSrc}" alt="${dbProduct.imageAlt}">
                </a>
                <h1>${dbProduct.name}</h1>
                <h3>${dbProduct.type}</h3>
                <p>${dbProduct.description}</p>
                <h2>$${(dbProduct.price * cartItem.quantity).toFixed(2)}</h2>
                <div class="actionButtons" style="display:flex; gap:10px; align-items:center;">
                    <button class="addToCart" onclick="changeQuantity('${cartItem.id}', -1)">-</button>
                    <span>Qty: ${cartItem.quantity}</span>
                    <button class="addToCart" onclick="changeQuantity('${cartItem.id}', 1)">+</button>
                    <button class="addToCart" style="background-color:#ff4c4c;" onclick="removeItem('${cartItem.id}')">Remove</button>
                </div>
            `;
            container.appendChild(article);
        }
    });

    updateCartTotals(totalItems, totalPrice);
}

window.changeQuantity = function(id, delta) {
    let cart = getCart();
    let item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart(cart);
        renderCartPage(); 
    }
};

window.removeItem = function(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    renderCartPage();
};

window.clearCart = function() {
    localStorage.removeItem('shopCart');
    updateGlobalCartCount();
    renderCartPage();
};

function updateCartTotals(items, cost) {
    const itemsBtn = document.getElementById('itemsInCart');
    const costBtn = document.getElementById('totalCart');
    
    if (itemsBtn) itemsBtn.innerText = `Items: ${items}`;
    if (costBtn) costBtn.innerText = `Total: $${cost.toFixed(2)}`;
}

// TOASTT NOTIFS
function showNotification(message) {
    let container = document.getElementById('notification-container');

    const notification = document.createElement('div');
    notification.classList.add('cart-notification');
    notification.innerText = message;

    container.appendChild(notification);
    
    setTimeout(() => { // note: it's like task.delay()
        notification.classList.add('active');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('active');
        
        setTimeout(() => {
            notification.remove();//buffer- wait for slide out first before destroying 
        }, 300);
    }, 3000);
}

//ashton s. 24505

