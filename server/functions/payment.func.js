const { db } = require("../utils/firestore")
const axios = require("axios")
const reputation = require("../utils/reputationConst")
const DEAL_REF = db.collection("deals")
const PRODUCT_REF = db.collection("products")
const paypal = require("paypal-rest-sdk")
const isEmpty = require("../utils/helpers")

const REPUTATION_REQUEST_HEADER = {
    "Content-Type": "application/json",
    "x-api-key": process.env.AWS_GATEWAY_API_KEY
}
const REPUTATION_REQUEST_URL = `https://${process.env.AWS_GATEWAY_ID}.execute-api.eu-central-1.amazonaws.com/Vmarket/user/reputation`
paypal.configure({
    'mode': 'sandbox',
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
})
module.exports = {
    paymentProduct: async (req, res) => {
        const productId = req.params.productId
        let buyer;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            try {
                idToken = req.headers.authorization.split('Bearer ')[1]
                const decodedToken = await admin.auth().verifyIdToken(idToken)
                req.user = decodedToken
                const userSnap = await db.collection("users").where("userId", "==", req.user.uid).limit(1).get()
                req.user.handle = userSnap.docs[0].data().handle
                buyer = req.user
            } catch (e) {
                console.warn("User is not authenticated")
                buyer = undefined
            }
        } else {
            byuer = undefined
        }
        console.log(buyer)
        try {
            const productRef = await PRODUCT_REF.doc(productId).get()
            if (!productRef.exists) {
                res.status(404).json({ message: `Product with id ${productId} is not found` })
            }
            if (productRef.data().sold) {
                res.status(400).json({ message: "product is already sold" })
            }
            const sellerHandle = productRef.data().seller
            if (buyer !== undefined) {
                if (sellerHandle == buyer) {
                    res.status(400).json({ message: "You cant buy your own product" })

                }
            }
            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": !isEmpty(buyer)?`http://localhost:5000/payment/${productId}/${buyer}/success`:`http://localhost:5000/payment/${productId}/success`,
                    "cancel_url": `http://localhost:5000/product/${productId}`
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": productRef.data().title,
                            "sku": "item",
                            "price": productRef.data().price,
                            "currency": "USD",
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total": productRef.data().price
                    },
                    "description": productRef.data().description
                }]
            }
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    console.log("error by createing")
                    throw error;
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href)
                        }
                    }
                }
            });
        } catch (e) {
            res.status(500).json({
                errorCode: e.code,
                error: e.message
            })
        }
    },
    paymentProductSuccess: async (req, res) => {
        console.log(req.params)
        const payerId = req.query.PayerID
        const paymentId = req.query.paymentId
        const productId = req.params.productId
        const productRef = await PRODUCT_REF.doc(productId).get()
        const buyerHandle = req.params.buyer || undefined
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": productRef.data().price
                }
            }]
        }
        paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
            try {
                if (error) {
                    throw error;
                } else {
                    await PRODUCT_REF.doc(productId).update({ sold: true })
                    await axios({
                        method: "PATCH",
                        headers: REPUTATION_REQUEST_HEADER,
                        url: REPUTATION_REQUEST_URL,
                        data: {
                            userId: productRef.data().seller,
                            reputationChange: reputation.USER_SOLD_ITEM
                        },
                        body: JSON.stringify({
                            userId: productRef.data().seller,
                            reputationChange: reputation.USER_SOLD_ITEM
                        })
                    })
                    if (buyerHandle) {
                        await axios({
                            method: "PATCH",
                            headers: REPUTATION_REQUEST_HEADER,
                            url: REPUTATION_REQUEST_URL,
                            data: {
                                userId: buyerHandle,
                                reputationChange: reputation.USER_BOUGHT_ITEM
                            },
                            body: JSON.stringify({
                                userId: buyerHandle,
                                reputationChange: reputation.USER_BOUGHT_ITEM
                            })
                        })
                    }
                    const dealRef = DEAL_REF.doc()
                    await dealRef.set({
                        sellerHandle: productRef.data().seller,
                        buyerHandle: buyerHandle || "anonym",
                        productId,
                        createdAt: new Date().toISOString()
                    })
                    await db.collection("notifications").doc(dealRef.id).set({
                        category: "deal",
                        dealId: dealRef.id,
                        read: false,
                        userHandle: productRef.data().seller
                    })
                    res.json({ success: "sucess", dealId: dealRef.id})
                }
            } catch (e) {
                console.log(e.message)
                console.log(e.code)
                res.json({ error: "error by executing ", e, errorMessage: e.message })
            }
        })
    },
    paymentProductFailure: (req, res) => {
        res.redirect(`http://localhost:3000/product/${req.params.productId}`)
    }
}
