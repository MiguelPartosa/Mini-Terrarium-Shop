import { createProductContainer } from './productMake.js';
import { ProductClasses } from './database.js';
const Product = ProductClasses.Product;
const ProductDatabase = ProductClasses.ProductDatabase;
const Cart = ProductClasses.Cart;
export const myCart = new Cart();

// Check if Products data exists in localStorage
let ProductsData = localStorage.getItem('products');

console.log(ProductsData);
// If Products data doesn't exist, initialize Products
let Products;
if (!ProductsData) {
  Products = new ProductDatabase();
  // Add initial products
  Products.add(new Product("LeafyLuxe", 3000, "./images/Terrarium Plants/terrarium (1).jpg"));
  Products.add(new Product("Emperor's Garden", 5500, "./images/Terrarium Plants/terrarium (2).jpg"));
  Products.add(new Product("Crystal Clear Garden", 2100, "./images/Terrarium Plants/terrarium (3).jpg"));
  Products.add(new Product("Succulent Serenity Sphere", 6300, "./images/Terrarium Plants/terrarium (4).jpg"));
  Products.add(new Product("Sahara Zen", 1900, "./images/Terrarium Plants/terrarium (5).jpg"));
  Products.add(new Product("Petite Paradise Enclosure", 5333, "./images/Terrarium Plants/terrarium (6).jpg"));
} else {
  // Parse Products data from localStorage
  Products = JSON.parse(ProductsData);
}

function main() {
  // Carousel();
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Optional: Add smooth scrolling behavior
  });
  console.log(Products);
  productList();
  addAddToCartListeners();
  extraListeners();
}

function extraListeners() {
  const resetButton = document.querySelector('.reset-button');
  resetButton.addEventListener('click', function () {
    resetDB();
  })
}

// main page contents here
function productList() {
  Products.productList.forEach(product => {
    const productContainer = createProductContainer(product);
    const container = document.getElementById("product-container");
    container.appendChild(productContainer);
  });
  console.log("added products");
}


function resetDB() {
  localStorage.clear();
  location.reload();
}

function Carousel() {
  console.log("added carousel");
  var carousel_images = document.querySelector(".carousel-image");
  var images = Products.productList.map(img => img.imageSrc);
  carousel_images.forEach(img => img.setAttribute("srcset", img));
  console.log(images);
}

function SmoothScrollTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scroll behavior
  });
}

// for when user goes to another anchor tag
function handleUnload() {
  if (lastClickedAnchor) {
    lastClickedAnchor.classList.remove("last-clicked");
  }
}

function saveProductsData() {
  localStorage.setItem('products', JSON.stringify(Products));
  console.log("saved");
}

function addAddToCartListeners() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      saveProductsData();
    });
  });
}

// execute main when everything is loaded
window.addEventListener("DOMContentLoaded", main());
