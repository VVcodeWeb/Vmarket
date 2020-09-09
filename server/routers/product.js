const express = require("express")
const auth = require("../utils/auth")
const router = express.Router()

const {
    getProduct, createProduct, 
    updateProduct, deleteProduct, 
    getAllProducts, commentProduct,
    } = require("../functions/product.func")

//------------------------CURD---------------------------
router.get("/product/:productId", getProduct)
router.post("/product",  createProduct)
router.patch("/product/:productId", auth, updateProduct)
router.delete("/product/:productId", auth, deleteProduct)

//------------------------Get products with query!---------------------------
router.get("/products", getAllProducts)

//------------------------Comment product---------------------------
router.post("/product/:productId/comment", auth, commentProduct)

module.exports = router