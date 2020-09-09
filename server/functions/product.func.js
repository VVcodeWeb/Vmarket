const { db } = require("../utils/firestore")
const firebase = require("firebase")
const config = require("../config/firebase-config")
const axios = require("axios")
const reputation = require("../utils/reputationConst")
const PRODUCT_REF = db.collection("products")
const COMMENT_REF = db.collection("comments")
const isEmpty = require("../utils/helpers")
const isObjEmpty = require("../utils/helpers")



//TODO: UPDATE PRODUCT
module.exports = {
    getProduct: async (req, res) => {
        const id = req.params.productId.trim()
        if (!id)
            return res.status(400).json({ error: "No id provided" })
        let productData;
        try {
            const docSnap = await PRODUCT_REF.doc(id).get()
            if (!docSnap)
                return res.status(404).json({ error: "Cant find product by given id" })
            productData = docSnap.data()
            productData.productId = docSnap.id
            const commentsProduct = await COMMENT_REF.where("productId", "==", id).get()
            productData.comments = []
            commentsProduct.forEach((comment) => {
                productData.comments.push(comment.data())
            })
            return res.json(productData)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    },
    createProduct: async (req, res) => {
        const seller = req.user || "valeriy"
        console.log(req.body)
        console.log(req.files)
        console.log(req.headers)
        const productInfo = req.body
        productInfo.price = parseInt(productInfo.price)
        if (isEmpty(productInfo.title) || isEmpty(productInfo.category) || productInfo.price <= 0)
            res.status(400).json({ error: "Information about the product is invalid" })
        try {
            const product = {
                title: productInfo.title,
                category: productInfo.category,
                price: productInfo.price,
                description: productInfo.description,
                seller: seller.handle || seller,
                averageRate: 0,
                numberOfRates: 0,
                sold: false,
                postAt: new Date().toISOString()
            }
            await PRODUCT_REF.doc().set(product)
            res.status(201).json({ product })
        } catch (e) {
            res.status(500).json({ errorCode: e.code, error: e.message, custom:"what" })
        }
    },
    updateProduct: async (req, res) => {

    },
    deleteProduct: async (req, res) => {
        const userHandle = req.user.handle
        const productId = req.params.productId.trim()
        try {
            const productSnap = await PRODUCT_REF.doc(productId).get()
            if (!productSnap.exists)
                return res.status(404).json({ error: "Cant find a product by given id" })
            const productSellerHandle = productSnap.data().saler
            if (productSellerHandle !== userHandle) {
                console.log(productSellerHandle)
                console.log(userHandle)
                return res.status(400).json({ error: "You are not allowed to delete a product of another user" })
            }
            await PRODUCT_REF.doc(productId).delete()
            res.status(200).json({ success: "Deleted" })
        } catch (e) {
            res.status(500).json({ errorCode: e.code, error: error.message })
        }
    },
    getAllProducts: async (req, res) => {
        const query = req.query
        let productsSnap;
        let products = [];
        try {
            if (isObjEmpty(query)) {
                productsSnap = await PRODUCT_REF.get()
            } else {
                if (Object.prototype.hasOwnProperty.call(query, "category")) {
                    productsSnap = await PRODUCT_REF.where("category", "==", query.category).get()
                }
            }

            productsSnap.forEach((productSnap) => {
                products.push(productSnap.data())
            })
            res.json(products)
        } catch (e) {
            res.status(500).json({ errorCode: e.code, error: e.message })
        }
    },
    commentProduct: async (req, res) => {
        if (isEmpty(req.body.comment)) return res.status(400).json({ error: "Empty comment" })
        if (req.body.rate < 0 || req.body.rate > 5) return res.status(400).json({ error: "Rate shoulbe in a range 0 to 5" })
        try {
            const userCommentOnProduct = await COMMENT_REF
                .where("productId", "==", req.params.productId)
                .where("userHandle", "==", req.user.handle).get()
            if (!userCommentOnProduct.empty)
                return res.status(400).json({ error: "You cant comment product twice" })
            const newComment = {
                body: req.body.comment,
                rate: req.body.rate,
                createdAt: new Date().toISOString(),
                productId: req.params.productId,
                userHandle: req.user.handle,
                userImage: req.user.imageUrl
            }
            const productSnap = await PRODUCT_REF.doc(req.params.productId).get()

            if (!productSnap.exists)
                return res.status(404).json({ error: "Cant find product by given id" })
            const sellerHandle = productSnap.data().seller
            if (sellerHandle === req.user.handle)
                return res.status(400).json({ error: "You cant comment your own product" })

            const newCommentRef = await COMMENT_REF.add(newComment)
            await axios({
                method: "POST",
                url: `https://${process.env.AWS_GATEWAY_ID}.execute-api.eu-central-1.amazonaws.com/Vmarket/notification`,
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.AWS_GATEWAY_API_KEY
                },
                data: {
                    commentId: newCommentRef.id
                },
                body: JSON.stringify({
                    commentId: newCommentRef.id
                })
            })
            res.status(201).json({ newComment })
        } catch (e) {
            res.status(500).json({ errorCode: e.code, error: e.message })
        }
    },
}