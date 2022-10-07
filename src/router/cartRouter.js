const express = require('express')
const router = express.Router()

const Manager = require('../controller/CartManager')
const manager = new Manager()

router.get("/", (req, res) => {
    let result = manager.findAllCarts()
    res.send(result);
});
  
/********************************************************/
router.get('/:id/productos', (req, res) => {
    let result = manager.findByIdCart(req.params.id);
    res.send(result);
});
/********************************************************/
router.post('/:id/productos', (req, res) => {
    let result = manager.addProduct(req.params.id, req.body);
    res.send(result)
});
/********************************************************/

router.put('/:id', (req, res) => {
    let result = manager.updateCart(req.params.id, req.body)
    if (!result) return res.send({error: 'product was not found'})
    res.send(result)
})


router.delete('/:id', (req, res) => {
    let result = manager.deleteCart(req.params.id)
    res.send(result)
})
module.exports = router