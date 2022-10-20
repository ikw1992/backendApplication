var express = require("express");
var router = express.Router();
const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

router.post("/upload", async (req, res) => {
  //etape une stoker la photo dans une variable temporraire
  console.log(req.files.photoFromFront);
  const photoPath = `./tmp/${uniqid()}.jpg`; //chemin vers la photo
  const resultMove = await req.files.photoFromFront.mv(photoPath);

  if (!resultMove) {
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);
    console.log(resultCloudinary);
    res.json({ result: true, url: resultCloudinary.secure_url });
  } else {
    res.json({ result: false, error: resultCopy });
  }

  fs.unlinkSync(photoPath);
});

module.exports = router;
