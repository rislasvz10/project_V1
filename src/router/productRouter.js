const express = require('express')
const router = express.Router()

const Manager = require('../controller/productsManager')
const manager = new Manager()


router.get("/", (req, res) => {
    let productsAll = manager.findAllProducts()
    res.send(productsAll);
});
  

router.get("/:id", (req, res) => {
    let productosId = manager.getproductsById(req.params.id);
    if (!productosId) return res.send({ error: "product was not found" });
    res.send(productosId);
});


router.post('/', (req, res) => {
    if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.send({error: 'data is required'})
    let result = manager.SaveNewProduct(req.body)
    res.send(result)
});


router.delete('/:id', (req, res) => {
    let result = manager.delete(req.params.id)
    res.send(result)
})












module.exports = router