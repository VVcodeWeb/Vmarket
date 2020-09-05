const {admin, db} = require("./firestore")

module.exports = auth = async (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1]
    } else {
        return res.status(403).json({ error: "Unauthorized" })
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        req.user = decodedToken
        const userSnap = await db.collection("users").where("userId", "==", req.user.uid).limit(1).get()
        req.user.handle = userSnap.docs[0].data().handle
        req.user.imageUrl = userSnap.docs[0].data().image || "not defined yet"
        return next()
    } catch (e) {
        console.log("Error by auth middleware")
        return res.status(403).json({error: e.message})
    }

}