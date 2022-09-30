const express = require('express')
const productsRouter = require('./src/router/productRouter')
const cartRouter = require('./src/router/cartRouter')

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartRouter )

