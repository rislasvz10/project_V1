const fs = require('fs');

let pathFile = '../data/products.json'; 

class ProductsManager {
    
    findAllProducts(){
        if(fs.existsSync(pathFile)){
            let data = fs.readFileSync(pathFile, 'utf-8')
            let products = JSON.parse(data);
            return { status: "success", message: products }
        } else {
            return { status: "error", message: "Data No Existente" }
        }
    }
    
}


module.exports = ProductsManager