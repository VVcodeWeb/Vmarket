const express = require("express")
const auth = require("../utils/auth")
const multer = require("multer")
const path = require("path")
const upload = multer({dest: (path.join(__dirname, "../tmp")), limits: 1024*1024*100})
const router = express.Router()
const {createUser, updateUser,
        deleteUser, getUser, 
        loginUser, getUserSales,
        getUserPurchases, getUserComments,
        likeUser, uploadImage} = require("../functions/user.func")
//------------------------CURD---------------------------
router.get("/:handle", getUser)
router.post("/", createUser)
router.post("/image", upload.any(), uploadImage)
router.patch("/", auth, updateUser)
router.delete("/", auth, deleteUser)

//------------------------Login, logout---------------------------
router.post("/login", loginUser)
router.post("/logout", auth, (req, res) => {
    res.json({result: "logged out "})
})
//------------------------All saled items, all bought items---------------------------
router.get("/:handle/sales", getUserSales)
router.get("/:handle/purchases", getUserPurchases)

//------------------------All user comments---------------------------
router.get("/:handle/comments", getUserComments)

//------------------------Like, unlike user---------------------------
router.get("/:handle/like", auth, likeUser)

module.exports = router