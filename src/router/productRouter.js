const express = require('express')
const router = express.Router()

const Manager = require('../controller/ProductsManager')
const manager = new Manager()

router.get("/", (req, res) => {
    let productsAll = manager.findAllProducts()
    res.send(productsAll);
});
  

router.get("/:id", (req, res) => {
    let productosId = manager.findProductById(req.params.id);
    if (!productosId) return res.send({ error: "product was not found" });
    res.send(productosId);
});


router.post('/', (req, res) => {
    let result = manager.saveProduct(req.body)
    res.send(result)
});


router.put('/:id', (req, res) => {
    //if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.send({error: 'data is required'})
    let result = manager.updateProduct(req.params.id, req.body)
    if (!result) return res.send({error: 'product was not found'})
    res.send(result)
})


router.delete('/:id', (req, res) => {
    let result = manager.deleteProducto(req.params.id)
    res.send(result)
})












module.exports = router