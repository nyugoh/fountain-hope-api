import express from "express";

const router = express.Router();
const imageDir = `${process.cwd()}/assets/images/`;

router.post("/upload", (req, res) => {
  if (!req.files) res.status(404).json({ status: "error" });
  for (let f in req.files) {
    req.files[f].mv(`${imageDir}${req.files[f].name}`, function(
      response,
      error
    ) {
      if (error) res.status(404).json({ status: "error" });
    });
  }
  res.json({ status: "ok" });
});

router.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  if (imageName === "undefined" || imageName === "null")
    res.sendFile(process.cwd() + "/assets/default.png");
  else res.sendFile(imageDir + imageName);
});

export default router;
