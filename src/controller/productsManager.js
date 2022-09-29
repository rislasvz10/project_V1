const fs = require("fs");

const pathToFile = "./src/data/products.json";

class ProductsManager {
  validacion = (product) => {
    if (
      !product.timestamp ||
      !product.nombre ||
      !product.descripcion ||
      !product.codigo ||
      !product.foto ||
      !product.precio ||
      !product.stock
    )
      return { status: "Error", message: "Agrega todos los campos" };
  };

  findAllProducts() {
    if (fs.existsSync(pathToFile)) {
      let data = fs.readFileSync(pathToFile, "utf-8");
      let products = JSON.parse(data);
      return products;
    } else {
      return { status: "error", message: "Data No Existente" };
    }
  }

  findProductById = (id) => {
    if (fs.existsSync(pathToFile)) {
      id = parseInt(id);
      let data = fs.readFileSync(pathToFile, "utf-8");
      let products = JSON.parse(data);
      let res = products.find((item) => item.id === id);
      if (!res) {
        return { status: "Error", message: "Producto no existente" };
      } else {
        return res;
      }
    } else {
      return { status: "Error", message: "Data no existente" };
    }
  };

  saveProduct = (product) => {
    if (this.validacion(product))
      if (fs.existsSync(pathToFile)) {
        let data = fs.readFileSync(pathToFile, "utf-8");
        let products = JSON.parse(data);
        let id;
        if (products.length === 0) id = 1;
        else id = products[products.length - 1].id + 1;
        product = {
          id,
          timestamp: Date.now(),
          ...product,
        };
        products.push(product);
        fs.writeFileSync(pathToFile, JSON.stringify(products, null, 2));
        return { status: "success", message: "Product Created!" };
      } else {
        return { status: "error", message: err.message };
      }
  };

  updateProduct = (id, product) => {
    if (fs.existsSync(pathToFile)) {
      id = parseInt(id);
      let data = fs.readFileSync(pathToFile, "utf-8");
      let products = JSON.parse(data);
      let newProducts = products.map((item) => {
        if (item.id === id) {
          return {
            id,
            ...product,
          };
        } else return item;
      });
      products = newProducts;
      fs.writeFileSync(pathToFile, JSON.stringify(newProducts, null, 2));
      return { status: "success", message: "Product Update!" };
    } else {
      return { status: "error", message: err.message };
    }
  };

  deleteProducto = (id) => {
    if (fs.existsSync(pathToFile)) {
      id = parseInt(id);
      let data = fs.readFileSync(pathToFile, "utf-8");
      let products = JSON.parse(data);
      let newProducts = products.filter((item) => item.id !== id);
      products = newProducts;
      fs.writeFileSync(pathToFile, JSON.stringify(newProducts, null, 2));
      return { status: "success", message: "Product deleted!" };
    } else {
      return { status: "error", message: err.message };
    }
  };
}

module.exports = ProductsManager;
