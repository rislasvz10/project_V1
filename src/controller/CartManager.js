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

  addProduct = (id, product) => {
    if (fs.existsSync(pathToFile)) {
      id = parseInt(id);
      let data = fs.readFileSync(pathToFile, "utf-8");
      let car = JSON.parse(data);
      let res = car.find((item) => item.id === id);
      if (!res) {
        return { status: "error", message: "Error no existe el carrito" };
      }
      const cartProducts = res.productos;
         if (cartProducts.length === 0) id = 1;
      else id = cartProducts[cartProducts.length - 1].id + 1;
      product = {
        id,
        timestamp: Date.now(),
        ...product,
      };

      //fs.writeFileSync(pathToFile, JSON.stringify(cartProducts, null, 2));
        return { status: "success", message: "Product Created!" };
    }else {
      return { status: "error", message: err.message };
    }
  };
}
module.exports = CartManager;
