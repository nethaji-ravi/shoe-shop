const cartIcon = document.querySelector(".cart-icon[data-target]");
const cartModalId = cartIcon.getAttribute("data-target");
const cartModal = document.getElementById(cartModalId);

const navContainer = document.querySelector(".nav-container");
const lightbox=document.querySelector('.lightbox');
const lightboxcontainer=document.querySelector('.shoe-lightbox-container');

cartIcon.addEventListener("mouseover", function () {
  // cartModal.style.display = 'block';
  if(window.screen.availWidth>550){
  cartIcon.click();
  }
});

// cartIcon.addEventListener('mouseout', function() {
//     cartModal.style.display = 'none';
// });

cartIcon.addEventListener("click", function (event) {
  event.stopPropagation();
  if(cartModal.hidden){
  cartModal.hidden = false;
  document.querySelector('body').classList.add("modal-open");
  }else{
    cartModal.hidden=true;
    document.querySelector('body').classList.remove("modal-open");
  }
});

document.addEventListener("click", function (event) {
  if (!cartModal.contains(event.target) && event.target !== cartIcon) {
    cartModal.hidden = true;
    document.querySelector('body').classList.remove("modal-open");
  }
  if(!navContainer.contains(event.target) ){
    document.getElementById('nav_check').checked=false;
    document.querySelector('.mobile-previous-icon').style.display="block";
    document.querySelector('body').classList.remove('nav-open');
  }

  // if (lightboxcontainer.style.display == "flex") {
  //   document.addEventListener("click", function (event) {
  //     if (!lightbox.contains(event.target)) {
  //       lightboxcontainer.style.display = "none";
  //     }
  //   });
  // }
 
});


var product_count = 1;
var num_of_item = document.querySelector(".increment");
var increment_count = document.getElementById("product_plus");
increment_count.addEventListener("click", function (event) {
  product_count++;
  num_of_item.innerText = product_count;
  count_of_product();
});
var increment_count = document.getElementById("product_minus");
increment_count.addEventListener("click", function (event) {
  product_count--;
  num_of_item.innerText = product_count;
  count_of_product();
});

// var img_container=document.getElementsByClassName('thumb-img');
var imageMapping = {
  one: "images/image-product-1.jpg",
  two: "images/image-product-2.jpg",
  three: "images/image-product-3.jpg",
  four: "images/image-product-4.jpg",
};
function imageChange(img) {
  var thumbImages = document.querySelectorAll(".thumb-img img");
  thumbImages.forEach(function (thumbImg) {
    thumbImg.style.opacity = "1"; 
    thumbImg.style.border = "none"; 
    thumbImg.addEventListener("mousemove", function () {
      thumbImg.style.opacity = "0.1";
    });
    thumbImg.addEventListener("mouseout", function () {
      thumbImg.style.opacity = "1";
    });
  });
  img.style.opacity = "0.1";
  img.style.border = "3px solid hsl(26, 100%, 55%)";

  var mainImage = document.querySelector(".main-image img");
  // mainImage.src = img.src;
  var classList = img.classList;
  if (classList.length > 0) {
    var className = classList[0];
    var imageUrl = imageMapping[className];
    if (imageUrl) {
      mainImage.src = imageUrl;
    }
  }
}

window.onload = function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartBadge(cart.length);
  generateCartHtml(cart);
};

var product = {
  name: "Fall Limited Edition Sneakers",
  price: 125.0,
  quantity: 1,
  image: "images/image-product-1-thumbnail.jpg",
};
function count_of_product() {
  var countOfProduct = document.querySelector(".increment").textContent;
    product.quantity=countOfProduct;
}


var cart = [];

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProductIndex = cart.findIndex(
    (item) => item.name === product.name
  );
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity++;
    swal.fire("Product Updated", "Product Updated to the Cart!", "info");
  } else {
    cart.push(product);
    swal.fire("Product Added", "Product Added to the Cart!", "success");
  }

  generateCartHtml(cart);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartBadge(cart.length);
}
function updateCartBadge(quantity) {
  const cartBadge = document.querySelector(".cart-badge");
  cartBadge.textContent = quantity;
}

const addToCartBtn = document.getElementById("add-to-cart");
addToCartBtn.addEventListener("click", function () {
  addToCart(product);
});

function generateCartHtml(cart) {
  const cartModalList = document.querySelector(".cart-modal-list");

  cartModalList.innerHTML = "";
  if (cart.length > 0) {
    const checkoutBtn=document.querySelector('#checkout-btn');
    checkoutBtn.style.display="block";
    cart.forEach(function (item, index) {
      const checkoutProducts = document.createElement("div");
      checkoutProducts.classList.add("checkout-products");

      const cartImgThumb = document.createElement("div");
      cartImgThumb.classList.add("cart-imgthumb");
      const img = document.createElement("img");
      img.src = item.image;
      cartImgThumb.appendChild(img);

      const cartProductDetail = document.createElement("div");
      cartProductDetail.classList.add("cart-product-detail");

      const productName = document.createElement("div");
      productName.classList.add("product");
      productName.textContent = item.name;

      const cartPrice = document.createElement("div");
      cartPrice.classList.add("cart-price");
      cartPrice.textContent = `$${item.price.toFixed(2)} x `;

      const quantity = document.createElement("span");
      quantity.classList.add("quantity");
      quantity.textContent = item.quantity;

      const total = document.createElement("span");
      total.classList.add("total");
      total.textContent = ` $${(item.price * item.quantity).toFixed(2)}`;

      cartPrice.appendChild(quantity);
      cartPrice.appendChild(total);

      cartProductDetail.appendChild(productName);
      cartProductDetail.appendChild(cartPrice);

      const cartDeleteIcon = document.createElement("div");
      cartDeleteIcon.classList.add("cart-delete-icon");

      const deleteImg = document.createElement("img");
      deleteImg.src = "images/icon-delete.svg";
      deleteImg.src = "images/icon-delete.svg";

      deleteImg.addEventListener("click", function () {
        deleteCartItem(index);  
      });
      cartDeleteIcon.appendChild(deleteImg);

      checkoutProducts.appendChild(cartImgThumb);
      checkoutProducts.appendChild(cartProductDetail);
      checkoutProducts.appendChild(cartDeleteIcon);

      cartModalList.appendChild(checkoutProducts);
    });
  } else {
    const checkoutBtn=document.querySelector('#checkout-btn');
    const emptyCart = document.createElement("p");
    emptyCart.textContent = "Your cart is empty!";

    cartModalList.appendChild(emptyCart);
    checkoutBtn.style.display="none";
  }
}

// function attachDeleteButtonListeners(){
//     const deleteButtons=document.querySelectorAll('.cart-delete-icon img');
//     deleteButtons.forEach((button,index)=>{
//         button.addEventListener('click',()=>{
//             deleteCartItem(index)
//         });
//     });
// }
// attachDeleteButtonListeners();

function deleteCartItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);
  swal.fire("Product Removed", "Product Removed from the Cart!", "warning");
  localStorage.setItem("cart", JSON.stringify(cart));
  generateCartHtml(cart);
  updateCartBadge(cart.length);
  // attachDeleteButtonListeners();
}

const lightbox_thumb=document.getElementById

function imageChangebox(thumbimg){
    const main_light_img = document.querySelector('.lightbox-main-image img');
   
    var light_thumb_images=document.querySelectorAll('.lightbox-thumb-image img');
    light_thumb_images.forEach(function(thumbImg){
        thumbImg.style.opacity="1";
        thumbImg.style.border="none";
        thumbImg.addEventListener('mousemove',function(event){
            thumbImg.style.opacity="0.1";
        });
        thumbImg.addEventListener('mouseout',function(event){
            thumbImg.style.opacity="1";
        });
        // thumbImg.style.opacity="0.1";
        // thumbImg.style.border="none";
    });
    thumbimg.style.opacity = "0.1";
    thumbimg.style.border = "3px solid hsl(26, 100%, 55%)";

    const classList=thumbimg.classList;
    if(classList.length>0){
        const className=classList[0];
        ImageUrl=imageMapping[className];
        main_light_img.src=ImageUrl;
    }
}

const close_lightbox=document.querySelector('.close-icon');
const lightbox_div=document.querySelector('.shoe-lightbox-container');
close_lightbox.addEventListener('click',function(){
    lightbox_div.style.display="none";
    document.querySelector('body').classList.remove('lightbox-open');
});

const main_image=document.querySelector('.main-image');
main_image.addEventListener('click',function(){
    // const screen=$(document).width();
    const screen=window.screen.availWidth;
    if(window.screen.availWidth>550){
  document.querySelector('body').classList.add("lightbox-open");
    lightbox_div.style.display="flex";
    }
});



const nextIcon=document.querySelector('.next-icon');
const previousIcon=document.querySelector('.previous-icon');

nextIcon.addEventListener('click',()=>{
    const main_light_img = document.querySelector('.lightbox-main-image img');
    const currentSrc=main_light_img.src;
    const currentSrcRelative = currentSrc.substring(currentSrc.lastIndexOf('/') + 1);

    let currentIndex=0;
    for (const key in imageMapping){
        if(imageMapping[key].includes(currentSrcRelative)){
            break;
        }
        currentIndex++;
    }

    const keys=Object.keys(imageMapping);
    const nextIndex=(currentIndex+1)%keys.length;
    const nextKey =keys[nextIndex];
    main_light_img.src=imageMapping[nextKey];

});

previousIcon.addEventListener('click',function(){
    const main_light_img = document.querySelector('.lightbox-main-image img');
    const currentSrc=main_light_img.src;
    const currentSrcRelative = currentSrc.substring(currentSrc.lastIndexOf('/') + 1);

    let currentIndex=0;
    for(const key in imageMapping){
        if(imageMapping[key].includes(currentSrcRelative)){
            break;
        }
        currentIndex++;
    }
    const keys = Object.keys(imageMapping);
    let previousIndex=(currentIndex-1)% keys.length;
    if (previousIndex < 0) {
      previousIndex = keys.length - 1; 
  }
    const previousKey=keys[previousIndex];
    main_light_img.src=imageMapping[previousKey];
});

const mobile_previousIcon=document.querySelector('.mobile-previous-icon');
const mobile_nextIcon=document.querySelector('.mobile-next-icon');

mobile_previousIcon.addEventListener('click',()=>{
  const mobile_main_img=document.querySelector('.main-image img');
  const currentSrc=mobile_main_img.src;
  const currentSrcRelative = currentSrc.substring(currentSrc.lastIndexOf('/') + 1);
  let currentIndex=0;
  for(const key in imageMapping){
    if(imageMapping[key].includes(currentSrcRelative)){
      break;
    }
    currentIndex++;
  }
  const keys=Object.keys(imageMapping);
  let previousIndex=(currentIndex-1)%keys.length;
  if(previousIndex<0){
    previousIndex = keys.length - 1;
  }
  const previouskey=keys[previousIndex];
  mobile_main_img.src=imageMapping[previouskey];
});

mobile_nextIcon.addEventListener('click',()=>{
  const mobile_main_img=document.querySelector('.main-image img');
  const currentSrc=mobile_main_img.src;
  const currentSrcRelative = currentSrc.substring(currentSrc.lastIndexOf('/') + 1);
  let currentIndex=0;
  for(const key in imageMapping){
    if(imageMapping[key].includes(currentSrcRelative)){
      break;
    }
    currentIndex++;
  }
  const keys=Object.keys(imageMapping);
  let nextIndex=(currentIndex+1)%keys.length;
  // if(prevIndex<0){
  //   previousIndex = keys.length - 1;
  // }
  const nextkey=keys[nextIndex];
  mobile_main_img.src=imageMapping[nextkey];
});

var nav_check=document.getElementById('nav_check');
nav_check.addEventListener('click',()=>{
  if(nav_check.checked){
    document.querySelector('.mobile-previous-icon').style.display="none";
    document.querySelector('body').classList.add('nav-open');
  }
  else{
    document.querySelector('.mobile-previous-icon').style.display="block";
    document.querySelector('body').classList.remove('nav-open');
  }
});


function checkout(){
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  toastr["error"]("Page is in Development!");
}