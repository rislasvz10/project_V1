const fs = require('fs');

const pathFile = '../data/products.json';

class ProductsManager{
    
    findAllProducts = async () => {
        if(fs.existsSync(pathFile)) {
            let data = await fs.promises.readFile(pathFile, 'utf-8')
            let products = JSON.parse(data)
            return {status: "success", message: "Users"}
        } else {
            return {status: "error", message: error.message}
        }
    }

    getproductsById = async (id) => {
        if(fs.existsSync(pathFile)) {
            let data = await fs.promises.readFile(pathFile, 'utf-8')
            let products = JSON.parse(data)
            let product = products.find( prod => prod.id === id)
            if(product) return {status: "success", message: product}
            return {status: "error", message: "Product not found"}
        }
        else {
            return {status: "error", message: error.message}
        }
    }

    SaveNewProduct = async (product) => {
        if (!product.timestamp || !product.nombre || !product.descripcion 
            || !product.codigo || !product.foto || !product.precio || !product.stock) 
            return { status: "Missing Fields", message:"missing fields"}
        try {
            if(fs.existsSync(pathFile)){
                let data = await fs.promises.readFile(pathFile, 'utf-8')
                let products = JSON.parse(data)
                let id = products[products.length-1].id+1
                product.id = id
                products.push(product)
                await fs.promises.writeFile(pathFile, JSON.stringify(products, null, 2))
                return {status: "success", message: "Product created"}
            } else {
                product.id = 1
                await fs.promises.writeFile (pathFile, JSON.stringify([product], null, 2))
                return {status: "success", message: "Product created"}
            }
        } catch (error) {
            return {status: "error", message: error.message}
        }
    }

}


module.exports = ProductsManager