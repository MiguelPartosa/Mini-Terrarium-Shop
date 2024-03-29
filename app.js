class Product {
  // for demo purposes, the quanitity available will be randomly declared in the iniitalization of the product
  constructor(name, price, imageSrc) {
    this.id = null;
    this.name = name;
    this.price = price;
    this.quantityAvailable = Math.floor(Math.random() * 10);
    this.imageSrc = imageSrc;
  }
}

class ProductDatabase {
  constructor() {
    this.productList = [];
  }

  randomId() {
    let idNum;
    do {
      idNum = Math.random().toString(36).substr(2, 9);
    } while (this.find(idNum));
    return idNum;
  }

  // pass product
  add(product) {
    product.id = this.randomId();
    this.productList.push(product);
  }

  // utility for updating quantity method
  find(id) {
    return this.productList.find((product) => product.id === id);
  }

  updateQty(id, newQuantity) {
    const product = this.find(id);
    if (product) {
      product.quantityAvailable = newQuantity;
      return true;
    }
    return false;
  }
}

// declaring our prelouded products databse
const Products = new ProductDatabase();
Products.add(
  new Product("LeafyLuxe", 3000, "./images/Terrarium Plants/terrarium (1).jpg")
);
Products.add(
  new Product("LeafyLuxe", 5500, "./images/Terrarium Plants/terrarium (2).jpg")
);
Products.add(
  new Product("LeafyLuxe", 2100, "./images/Terrarium Plants/terrarium (3).jpg")
);
Products.add(
  new Product("LeafyLuxe", 6300, "./images/Terrarium Plants/terrarium (4).jpg")
);
Products.add(
  new Product("LeafyLuxe", 1900, "./images/Terrarium Plants/terrarium (5).jpg")
);
Products.add(
  new Product("LeafyLuxe", 5333, "./images/Terrarium Plants/terrarium (6).jpg")
);

function main() {
  Carousel();
  console.log(Products);
}

// handle functionality for main page like toggling opacity for products with 0 qty
function productList() {
  pass;
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

// execute main when everything is loaded
window.addEventListener("DOMContentLoaded", main());
