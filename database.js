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

// to simplify, i merged the userbalance and the cart items into one class
class Cart {
    constructor() {
        this.balance = 9500;
        this.cartList = [];
        this.subTotal = 0;
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
    remove(product) {

    }

    purchase() {
        if (this.subTotal > this.balance) {
            console.log("not enough moneys ");
            return false
        }
        else {
            this.balance -= this.subTotal;
            this.cartList = [];
            return true;
        }
    }
}

export const ProductClasses = {
    Product,
    ProductDatabase,
    Cart
};