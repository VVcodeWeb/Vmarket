const path = require("path");
const os = require("os");
const fs = require("fs");
const { v4: uuid } = require("uuid")
const { db, admin } = require("../utils/firestore");



module.exports =  isEmpty = string => string.trim() === ''

module.exports = isObjEmpty= obj => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = uploadImageFunc = (req, document) => {
    let imageToBeUploaded = {};
    req.file = req.files[0];
    let generatedToken = uuid();
    console.log(generatedToken)
    const mimetype = req.file.mimetype;
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    try {
      const imageExtension = req.file.originalname.split(".")[
        req.file.originalname.split(".").length - 1
      ];
      const filepath = path.join(
        __dirname,
        `../tmp/${req.file.filename}.${imageExtension}`
      );
      fs.renameSync( req.file.path, filepath);
      imageToBeUploaded = { filepath, mimetype };
      admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
              firebaseStorageDownloadTokens: generatedToken,
            },
          },
        })
        .then(() => {
          // Append token to url &token=${generatedToken
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/vsale-809d2.appspot.com/o/${req.file.filename}.${imageExtension}?alt=media&token=${generatedToken}`;
          return db
            .doc(document)
            .update({ imageUrl });
        })
        .then(() => {
          setTimeout(
            () => deleteFile(imageToBeUploaded.filepath),
            time_remaining(Date.now() + 1000 * 15)
          );
          return {"success": "Done!"};
        })
        .catch((e) => {
          console.error(e);
          throw new Error (e.message)
        });
    } catch (e) {
        throw new Error(e.message)
    }
}


const time_remaining = (date) => new Date(date) - new Date();
const deleteFile = (filePath) =>
  fs.unlink(filePath, (e) => console.log("File deleted " + e));
