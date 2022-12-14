const express = require('express')
const router = express.Router()

const Manager = require('../controller/ProductsManager')
const manager = new Manager()

router.get("/", (req, res) => {
    let result = manager.findAllProducts()
    res.send(result);
});
  
router.get("/:id", (req, res) => {
    let result = manager.findProductById(req.params.id);
    res.send(result);
});

router.post('/', (req, res) => {
    let result = manager.saveProduct(req.body)
    res.send(result)
});

router.put('/:id', (req, res) => {
    let result = manager.updateProduct(req.params.id, req.body)
    if (!result) return res.send({error: 'product was not found'})
    res.send(result)
})

router.delete('/:id', (req, res) => {
    let result = manager.deleteProducto(req.params.id)
    res.send(result)
})

module.exports = router