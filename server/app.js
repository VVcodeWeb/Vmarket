const app = require("express")()
const userRouter = require("./routers/user")
const productRouter = require("./routers/product")
const paymentRouter = require("./routers/payments")
const bodyParser = require("body-parser")
require("./utils/firestore")
const busboyBodyParser = require('busboy-body-parser');
app.use(busboyBodyParser());

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use("/user", userRouter)
app.use("/", productRouter)
app.use("/", paymentRouter)

app.get("/", (req, res) => {
    res.status(200).json({gretings: "hello"})
})



module.exports = app