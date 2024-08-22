// Constantes y Variables
const products = [
    { id: 1, name: "Gabinete Deepcool Matrexx", price: 56000, image: "gabinete1.jpg" },
    { id: 2, name: "Gabinete Redragon Ratchet", price: 97000, image: "gabinete2.jpg" },
    { id: 3, name: "Gabinete Deepcool", price: 136000, image: "gabinete3.jpg" },
    { id: 4, name: "Gabinete Gamer Corsair 4000d", price: 169000, image: "gabinete.jpg" },
    { id: 5, name: "Placa de Video Msi Geforce Rtx 3050", price: 550500, image: "placa_video5.jpg" },
    { id: 6, name: "Placa de video Nvidia GeForce GTX 1660 Ti", price: 599999, image: "placa_video4.jpg" },
    { id: 7, name: "Placa de video Asus Geforce Rtx 3080 Ti", price: 999999, image: "placa_video1.jpg" },
    { id: 8, name: "Placa de video Nvidia MSI Ventus RTX 3060 Ti", price: 1100000, image: "placa_video2.jpg" },
    { id: 9, name: "Memoria RAM Fury Beast DDR4 8gb", price: 30000, image: "MemoriaRAM1.jpg" },
    { id: 10, name: "Memoria Ram Fury Beast Ddr4 16gb", price: 65000, image: "memoriaram2.jpg" },
    { id: 11, name: "Memoria RAM Vengeance RGB 16GB", price: 120000, image: "ram.jpg" },
    { id: 12, name: "Motherboard Asus Prime A520m-k M.2", price: 130000, image: "mother2.jpg" },
    { id: 13, name: "Motherboard Gigabyte Amd A520m K", price: 140000, image: "mother3.jpg" },
    { id: 14, name: "Motherboard Mother Asus Tuf Z590-plus", price: 490000, image: "mother.jpg" },
    { id: 15, name: "Fuente de alimentación Corsair 650w", price: 135000, image: "fuente1.jpg" },
    { id: 16, name: "Fuente de alimentación Gigabyte 850w", price: 230000, image: "fuente2.jpg" }, 
    { id: 17, name: "Fuente de alimentación Corsair 1000w", price: 430000, image: "fuente3.jpg" },
    { id: 18, name: "Cooler Fan 120mm Negro", price: 10000, image: "cooler1.jpg" },
    { id: 19, name: "Cooler Masterfan Mf120 Argb", price: 15000, image: "cooler2.jpg" },
    { id: 20, name: "Cooler Corsair Sp 140mm Rgb", price: 45000, image: "cooler3.jpg" },
    { id: 21, name: "Noctua Nf-f12 black 120mm", price: 100000, image: "cooler4.jpg" },
    { id: 22, name: "Procesador AMD Ryzen 7 5700G", price: 380000, image: "procesador1.jpg" },
    { id: 23, name: "Procesador gamer AMD Ryzen 9 7900", price: 598000, image: "procesador2.jpg" },
    { id: 24, name: "Procesador gamer Intel Core i7-11700k", price: 395000, image: "procesador3.jpg" },
    { id: 25, name: "Procesador gamer Intel Core i9-14900K", price: 1500000, image: "procesador4.jpg" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Librería externa SweetAlert2
import Swal from 'sweetalert2';

// Función para mostrar los productos
function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <span>${product.name} - $${product.price.toLocaleString()}</span>
                <button onclick="addToCart(${product.id})">Añadir al carrito</button>
            </div>
        `;
        productsContainer.appendChild(productDiv);
    });
}

// Añadir productos al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        Swal.fire({
            title: 'Añadido al carrito',
            text: `${product.name} se añadió al carrito.`,
            icon: 'success',
            confirmButtonText: 'Continuar'
        });
    }
}

// Muestra el carrito
function viewCart() {
    if (cart.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'No tienes productos en el carrito.',
            icon: 'info',
            confirmButtonText: 'Ok'
        });
        return;
    }

    let cartSummary = 'Productos en el carrito:<br><br>';
    let total = 0;

    cart.forEach(item => {
        cartSummary += `${item.name} - $${item.price.toLocaleString()}<br>`;
        total += item.price;
    });

    cartSummary += `<br><strong>Total: $${total.toLocaleString()}</strong>`;

    Swal.fire({
        title: 'Carrito de compras',
        html: cartSummary,
        showCancelButton: true,
        confirmButtonText: 'Proceder al pago',
        cancelButtonText: 'Seguir comprando'
    }).then((result) => {
        if (result.isConfirmed) {
            checkout();
        }
    });
}

// Proceder al pago
function checkout() {
    if (cart.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'No tienes productos en el carrito.',
            icon: 'info',
            confirmButtonText: 'Ok'
        });
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    Swal.fire({
        title: 'Confirmar compra',
        text: `El total es $${total.toLocaleString()}. ¿Deseas proceder al pago?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Compra realizada',
                text: 'Gracias por tu compra.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });
}

//Función Buscar productos

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayFilteredProducts(filteredProducts);
}

//Función Mostrar productos filtrados

function displayFilteredProducts(filteredProducts) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <span>${product.name} - $${product.price.toLocaleString()}</span>
                <button onclick="addToCart(${product.id})">Añadir al carrito</button>
            </div>
        `;
        productsContainer.appendChild(productDiv);
    });
}

// Iniciar la aplicación
displayProducts();