const app = require("express")()
const userRouter = require("./routers/user")
const productRouter = require("./routers/product")
const paymentRouter = require("./routers/payments")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const path = require("path")
const cors = require('cors')
require("./utils/firestore")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())



app.use("/user", userRouter)
app.use("/", productRouter)
app.use("/", paymentRouter)

app.get("/", (req, res) => {
    res.status(200).json({gretings: "hello"})
})



module.exports = app