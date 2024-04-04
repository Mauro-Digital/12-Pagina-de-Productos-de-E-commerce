// Cambio de cantidad de articulos ingresado por el usuario.

let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

plusBtn.addEventListener('click', ()=>{
    userInputNumber++;
    userInput.value = userInputNumber;
    console.log('userInputNumber');
});

minusBtn.addEventListener('click', ()=>{
    userInputNumber--;
    if(userInputNumber <= 0){
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
    console.log('userInputNumber');
});

// Agregar el total de productos al carrito cuando se presiona el boton "Add to cart"
const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click', ()=>{     
    lastValue = lastValue + userInputNumber;

    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block'; 
    drawProductInModal();
});

// Mostrar el modal con el detalle del carrito.
const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
// let priceModal = document.querySelector('.cart-modal__price');
const productContainer = document.querySelector('.cart-modal__chekout-container');

    function toggleModal() {
        if (cartModal.style.display === 'block') {
            cartModal.style.display = 'none'; // Si el modal está abierto, cerrarlo
        } else {
            cartModal.style.display = 'block'; // Si el modal está cerrado, abrirlo
        }
    }
    
    // Abrir o cerrar el modal al hacer clic en el botón del carrito
    cartIconBtn.addEventListener('click', () => {
        toggleModal();

        if(lastValue === 0){
            productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';            
        }else{
            drawProductInModal();
        }           
});

// Borrar el contenido del carrito
function deleteProduct(){
    const deleteProductBtn = document.querySelector('.cart-modal__delete'); 
    deleteProductBtn.addEventListener('click', ()=>{
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
    });
}

// Cambiar imágenes cuando se presione los botones flecha.
const imageContainer = document.querySelector('.gallery__image-container');
const previusGalleryBtn = document.querySelector('.gallery__previus')
const nextGalleryBtn = document.querySelector('.gallery__next')
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', ()=>{
    changeNextImage(imageContainer);
});

previusGalleryBtn.addEventListener('click', ()=>{
    changePreviusImage(imageContainer);
});

// Mostrar el modal de imagenes cuando hago click en la imagen principal
const imagesModal = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', ()=>{
    imagesModal.style.display = 'grid';
});

closeModalBtn.addEventListener('click', ()=>{
    imagesModal.style.display = 'none';
});

// Cambiar las imagenes principales desde los thumbnails.
let thumbnails = document.querySelectorAll('.gallery__thumbnail');
thumbnails = [...thumbnails]
            
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event=>{
        console.log(event.target.id);
        imageContainer.style.backgroundImage = `url('./images/image-product-${event.target.id}.jpg')`
    });
});

// Cambiar las imagenes principales desde los thumbnails en el MODAL.
let modalThumbnails = document.querySelectorAll('.modal-gallery__thumbnail');
const modalImageContainer = document.querySelector('.modal-gallery__image-container');
modalThumbnails = [...modalThumbnails]

modalThumbnails.forEach(modalThumbnail => {
    modalThumbnail.addEventListener('click', event=>{
        console.log(event.target.id.slice(-1));
        modalImageContainer.style.backgroundImage = `url('./images/image-product-${event.target.id.slice(-1)}.jpg')`
    });
});

// Cambiar imagen principal de modal desde flechas en el modal.
const previusModalBtn = document.querySelector('.modal-gallery__previus');
const nextModalBtn = document.querySelector('.modal-gallery__next');

nextModalBtn.addEventListener('click', ()=>{
    changeNextImage(modalImageContainer);
});

previusModalBtn.addEventListener('click', ()=>{
    changePreviusImage(modalImageContainer);
});

const menuBtn = document.querySelector('.header__navegation');
const menu = document.querySelector('.header__menu');
const modalNavbarBackground = document.querySelector('.modal-navbar__background');
const modalNavbarCloseIcon = document.querySelector('.modal-navbar__close-icon');

menuBtn.addEventListener('click', () => {
    menu.style.display = 'grid';
    modalNavbarBackground.style.display = 'block'; // Mostrar el fondo oscuro del modal
});

// Cerrar el modal del navbar
modalNavbarCloseIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Detener la propagación del evento para que no afecte al botón de navegación
    modalNavbarBackground.style.display = 'none'; // Ocultar el fondo oscuro del modal
});

// FUNCIONES
function drawProductInModal(){
    productContainer.innerHTML = `
    <div class="cart-modal__chekout-container">
        <div class="cart-modal__details-container">
            <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="thumbnail">
            <div> 
                <p class="cart-modal__product">Autumn Limited Edition...</p>
                <p class="cart-modal__price">$125 x3 <span>$375.00</span></p>
            </div>
            <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
        </div>
        <button class="cart-modal__chekount">Checkout</button>
    </div>` 
    deleteProduct();
    let priceModal = document.querySelector('.cart-modal__price');
    priceModal.innerHTML = `$125 x${lastValue} <span>$${lastValue*125}.00</span>`
};

function changeNextImage(imgContainer){
    if(imgIndex === 4){
        imgIndex = 1;
    }else{
        imgIndex++;
    }    
    imgContainer.style.backgroundImage = `url('./images/image-product-${imgIndex}.jpg')`
}

function changePreviusImage(imgContainer){
    if(imgIndex === 1){
        imgIndex = 4;
    }else{
        imgIndex--;
    } 
    imgContainer.style.backgroundImage = `url('./images/image-product-${imgIndex}.jpg')`
}




