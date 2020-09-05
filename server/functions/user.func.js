const { db, admin } = require("../utils/firestore")
const firebase = require("firebase")
const config = require("../config/firebase-config")
const USER_REF = db.collection("users")
const validator = require("validator")
const PRODUCT_REF = db.collection("products")
const DEAL_REF = db.collection("deals")
const COMMENT_REF = db.collection("comments")
const LIKE_REF = db.collection("likes")
const axios = require("axios")
const reputationConst = require("../utils/reputationConst")
const isEmpty = require("../utils/helpers")
const BusBoy = require("busboy")
const path = require("path")
const os = require("os")
const fs = require("fs")


firebase.initializeApp(config)

module.exports = {
    //TODO: image upload!
    createUser: async (req, res) => {
        const body = req.body || req.query
        const noImg = 'no-image.png'
        try {
            if (!body)
                throw new Error("Empty credentials")
            const email = body.email.toLowerCase().trim()
            const handle = body.handle.toLowerCase().trim()
            if (!validator.isEmail(body.email))
                throw new Error("Provided email isnt valid")
            const foundUserByEmailSnap = await USER_REF.where("email", "==", email).get()
            if (!foundUserByEmailSnap.empty)
                throw new Error("User with this email is already registered")
            if (body.password === "password")
                throw new Error("Password cant be equal password!")
            if (body.handle.length < 4)
                throw new Error("User handle should be at least 4 characters")
            const foundUserByHandleSnap = await USER_REF.doc(`${body.handle}`).get()

            if (foundUserByHandleSnap.exists)
                throw new Error("Handle is already taken")

            const data = await firebase.auth().createUserWithEmailAndPassword(email, body.password)
            const token = await data.user.getIdToken()
            const userCredentials = {
                email,
                handle,
                userId: data.user.uid,
                firstName: body.firstName,
                lastName: body.lastName,
                reputation: 0,
                deals: [],
                products: [],
                createdAt: new Date().toISOString(),
                comments: [],
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/vsale-809d2.appspot.com/o/${noImg}?alt=media`
            }
            await USER_REF.doc(`${userCredentials.handle}`).set(userCredentials)
            res.status(201).json({ success: "User has been created, id: " + data.user.uid + " !", token })
        } catch (e) {
            if (e.code === "auth/email-already-in-use") {
                return res.status(400).json({ error: "Email is already in use" })
            } else {
                res.status(400).json({ error: e.message })
            }
        }
    },
    //TODO: It doesnt work!
    uploadImage: (req, res) => {
        const busboy = new BusBoy({ headers: req.headers });
        let imageFileName;
        let imageToBeUploaded = {}
        console.log(req.headers)
        //let generatedToken = uuid()     
        busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
            console.log(fieldname, file, filename, encoding, mimetype);
            if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
                return res.status(400).json({ error: "Wrong file type submitted" });
            }
            const imageExtension = filename.split(".")[filename.split(".").length - 1];
            imageFileName = `${Math.round(
                Math.random() * 1000000000000
            ).toString()}.${imageExtension}`;
            const filepath = path.join(os.tmpdir(), imageFileName);
            imageToBeUploaded = { filepath, mimetype };
            file.pipe(fs.createWriteStream(filepath));
        });
        busboy.on("field", (key, value, keyTruncated, valueTruncated) => {
            console.log("sent as not file")
        })
        busboy.on("finish", () => {
            admin
                .storage()
                .bucket()
                .upload(imageToBeUploaded.filepath, {
                    resumable: false,
                    metadata: {
                        metadata: {
                            contentType: imageToBeUploaded.mimetype,
                            //Generate token to be appended to imageUrl
                            //firebaseStorageDownloadTokens: generatedToken,
                        },
                    },
                })
                .then(() => {
                    // Append token to url &token=${generatedToken
                    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/vsale-809d2.appspot.com/o/${imageFileName}?alt=media}`;
                    return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
                })
                .then(() => {
                    return res.json({ message: "image uploaded successfully" });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({ error: "something went wrong" });
                });
        });
        busboy.end(req.rawBody);

    },
    updateUser: async (req, res) => {
        const updatedUser = req.body
        const user = req.user
        try {
            await USER_REF.doc(user.handle).set(updatedUser, { merge: true })
            res.status(200).json({ success: updatedUser })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    },
    deleteUser: async (req, res) => {
        const user = req.user || req.body
        try {
            await USER_REF.collection.doc(user.handle).delete()
            res.status(200).json({ success: "User has been deleted" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    },
    getUser: async (req, res) => {
        const handle = req.params.handle
        try {
            const userSnap = await USER_REF.doc(handle).get()
            if (userSnap.exists)
                return res.json({ user: userSnap.data() })
            else
                res.status(400).json({ error: "User is not found" })
        } catch (e) {
            res.status(500).send({ error: e.code })
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = {
                email: req.body.email,
                password: req.body.password
            }
            let errors = {}
            if (isEmpty(user.email)) errors.email = "Must not be empty"
            if (isEmpty(user.password)) errors.password = "Must not be empty"

            if (Object.keys(errors).length > 0) return res.status(400).json(errors)

            const data = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            const token = await data.user.getIdToken()
            res.json({ token })
        } catch (e) {
            if (e.code === "auth/wrong-password" || e.code === "auth/user-not-found") {
                return res.status(403).json({ error: 'Wrong credentials, please try again' })
            }
            return res.status(500).json({ error: e.message, code: e.code })
        }
    },
    logoutUser: async (req, res) => {
        firebase.auth().signOut()
    },
    getUserSales: async (req, res) => {
        const userHandle = req.params.handle
        let userSales = {
            current: [],
            old: []
        }
        try {
            const userCurrentSalesSnap = await PRODUCT_REF.where("seller", "==", userHandle)
            if (!userCurrentSalesSnap.empty) {
                userCurrentSalesSnap.forEach((sale) => {
                    userSales.current.push(sale.data())
                })
            }
            const userOldSalesSnap = await DEAL_REF.where("seller", "==", userHandle)
            if (!userOldSalesSnap.empty) {
                userOldSalesSnap.forEach((sale) => {
                    userSales.old.push(sale.data())
                })
            }
            res.json({ userSales })
        } catch (e) {
            res.status(500).json({ errorCode: e.code, error: e.message })
        }
    },
    getUserPurchases: async (req, res) => {
        const userHandle = req.params.handle
        let userPurchases = []
        try {
            const userPurchasesSnap = await DEAL_REF.where("buyer", "==", userHandle).get()
            if (!userPurchasesSnap.empty) {
                userPurchasesSnap.forEach((purchase) => {
                    userPurchases.push(purchase.data())
                })
            }
            res.json({ userPurchases })
        } catch (e) {
            res.status(500).json({ errorCode: e.code, error: e.message })
        }
    },
    getUserComments: async (req, res) => {
        const userHandle = req.params.handle
        let comments = [];
        try {
            const userCommentsSnap = await COMMENT_REF.where("userHandle", "==", userHandle)
            if (!userCommentsSnap.empty) {
                userCommentsSnap.forEach((comment) => {
                    comments.push(comment.data())
                })
            }
            res.json({ comments })
        } catch (e) {
            res.status(500).json({ errorCode: e.code, error: e.message })
        }
    },
    likeUser: async (req, res) => {
        const targetHandle = req.params.handle
        const user = req.user
        let like = {}
        try {
            const checkTargetUserSnap = await USER_REF.doc(targetHandle).get()
            if (!checkTargetUserSnap.exists)
                return res.status(404).json({ error: "Cant find user" })
            if (targetHandle === user.handle) {
                return res.status(400).json({ error: "You cant like yourself" })
            }
            const targetLikesFromUserSnap = await LIKE_REF
                .where("target", "==", targetHandle)
                .where("from", "==", user.handle).get()
            if (!targetLikesFromUserSnap.empty) {
                return res.status(400).json({ error: "You cant like twice" })
            }
            like.from = user.handle
            like.target = targetHandle
            await LIKE_REF.add(like)
            const response = await axios({
                method: "PATCH",
                url: `https://${process.env.AWS_GATEWAY_ID}.execute-api.eu-central-1.amazonaws.com/Vmarket/user/reputation`,
                headers:{
                    "Content-Type": "application/json",
                    "x-api-key": process.env.AWS_GATEWAY_API_KEY
                },
                data:{
                    userId: targetHandle,
                    reputationChange: reputationConst.USER_GOT_LIKED
                },
                body: JSON.stringify({
                    userId: targetHandle,
                    reputationChange: reputationConst.USER_GOT_LIKED
                })
            })
            res.json({ success: "Liked!" })
        } catch (e) {
            res.status(500).json({ errorCode: e.code, error: e.message })
        }
    }
}



