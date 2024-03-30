import { saveData } from "./app.js";
import { populateCartItems } from "./app.js";
import { Products } from "./app.js";

class Product {
    // for demo purposes, the quanitity available will be randomly declared in the iniitalization of the product
    constructor(name, price, imageSrc) {
        this.id = null;
        this.name = name;
        this.price = price;
        this.quantityAvailable = Math.floor(Math.random() * 20) + 1;
        this.quantity = 0; // this will be used for the cart database
        this.imageSrc = imageSrc;
    }
}

class ProductDatabase {
    constructor(data = null) {
        this.productList = data ? data.productList : [];
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

    reStock(productId, quantity) {
        const product = this.find(productId);
        product.quantityAvailable += quantity;
        console.log("quantity return:", product.quantityAvailable);
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

// to simplify, i merged the userbalance and the cart items into one class
class Cart {
    constructor(data = null) {
        if (data) {
            this.setData(data);
        } else {
            this.balance = 0;
            this.cartList = [];
            this.subTotal = 0;
        }
    }

    setBalance(balance) {
        this.balance = balance;
    }

    setData(data) {
        this.balance = data.balance || 0;
        this.cartList = data.cartList || [];
        this.subTotal = data.subTotal || 0;
    }

    add(product) {
        if (this.find(product.id)) {
            let found = this.find(product.id);
            found.quantity += 1;
        }
        else {
            product.quantity = 1;
            this.cartList.push(product);
        }
        this.subTotal += product.price;
    }

    find(id) {
        return this.cartList.find((product) => product.id === id);
    }

    deduct(productId) {
        const productsToRemove = this.cartList.filter(product => product.id === productId);
        productsToRemove.forEach(productToRemove => {
            Products.reStock(productToRemove.id, productToRemove.quantity);
            const index = this.cartList.indexOf(productToRemove);
            if (index !== -1) {
                this.cartList.splice(index, 1);
                this.subTotal -= productToRemove.price * productToRemove.quantity;
            }
        });
        saveData();
        populateCartItems();
    }


    purchase() {
        if (this.subTotal > this.balance) {
            alert("insufficient funds");
            return false
        }
        else {
            location.reload();
            alert('Order successfully added');
            this.balance -= this.subTotal;
            this.cartList = [];
            this.subTotal = 0;
            saveData();
            populateCartItems();
            return true;
        }

    }
}

export const ProductClasses = {
    Product,
    ProductDatabase,
    Cart
};