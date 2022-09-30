const fs = require("fs");

const pathToFile = "./src/data/carts.json";

class CartManager {

  findAllCarts(){
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
  

  saveCart = (cart) => {

  }

  updateCart = (id, cart) => {

  }

  delete = (id) =>{

  }


}

module.exports = CartManager;