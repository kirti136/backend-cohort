const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

const allowedTypes = ["image/png", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only PNG and JPEG files are allowed!"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_SIZE_MB) * 1024 * 1024,
  },
});

// POST /api/upload
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(422).json({ error: "No file uploaded" });
  }

  const url = `http://localhost:${process.env.PORT || 3000}/uploads/${
    req.file.filename
  }`;
  res.json({ url });
});

// GET /api/storage
router.get("/storage", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Could not read storage" });

    let totalSize = 0;
    files.forEach((file) => {
      const { size } = fs.statSync(path.join(uploadDir, file));
      totalSize += size;
    });

    res.json({ bytes: totalSize });
  });
});

module.exports = router;
