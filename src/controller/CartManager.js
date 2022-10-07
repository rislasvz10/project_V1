const fs = require("fs");

const pathToFile = "./src/data/carts.json";

class CartManager {
  findAllCarts() {
    if (fs.existsSync(pathToFile)) {
      let data = fs.readFileSync(pathToFile, "utf-8");
      let car = JSON.parse(data);
      return car;
    } else {
      return { status: "error", message: "Data No Existente" };
    }
  }

  findByIdCart = (id) => {
    if (fs.existsSync(pathToFile)) {
      id = parseInt(id);
      let data = fs.readFileSync(pathToFile, "utf-8");
      let car = JSON.parse(data);
      let res = car.find((item) => item.id === id);
      if (!res) {
        return { status: "Error", message: "Producto no existente" };
      } else {
        return res;
      }
    } else {
      return { status: "Error", message: "Data no existente" };
    }
  };

  saveCart() {
    let carts = [];
    let newCart;
    if (fs.existsSync(pathToFile)) {
      carts = this.findAllCarts();
      if (carts.length > 0) {
        newCart = {
          id: carts[carts.length - 1].id + 1,
          timestamp: Date.now(),
          productos: [],
        };
      } else {
        newCart = { id: 1, timestamp: Date.now(), productos: [] };
      }
      fs.writeFileSync(
        pathToFile,
        JSON.stringify([...carts, newCart], null, 2)
      );
      return { status: "success", message: "Carrito Created!" };
    } else {
      return { status: "error", message: err.message };
    }
  }


  addProducts(id, p) {
    carts = this.findAllCarts();
    const index = carts.findIndex((c) => c.id === id);
    const newProd = p;
    if (index === -1) {
      return { error: 400, descripcion: `No existe el carrito de id ${id}` };
    }
    const cartProducts = carts[index].productos;
    const cartProdLength = cartProducts.length;
    if (cartProdLength > 0) {
      newProd.id = cartProducts[cartProdLength - 1].id + 1;
    } else {
      newProd.id = 1;
    }
    newProd.timestamp = Date.now();
    cartProducts.push(newProd);
    try {
      fs.writeFileSync(pathToFile, JSON.stringify(carts, null, 2));
      return newProd;
    } catch (err) {
      return { status: "error", message: err.message };
    }
  }

  

  updateCart = (id, cart) => {};

  delete = (id) => {};
}

module.exports = CartManager;
