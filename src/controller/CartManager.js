const fs = require("fs");

const pathToFile = "./src/data/products.json";

class ProductsManager {

  validacion(product) {
    if (
      !product.timestamp ||
      !product.nombre ||
      !product.descripcion ||
      !product.codigo ||
      !product.foto ||
      !product.precio ||
      !product.stock
    )
      return { status: "success", message: "missing fields" };
  }
  validacion(cart) {
    if (!product.timestamp)
      return { status: "success", message: "missing fields" };
  }
}

module.exports = CartManager;
//{ status: "success", message: products }