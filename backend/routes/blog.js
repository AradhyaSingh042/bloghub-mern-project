
const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const { auth } = require("../middlewares/AuthN");

const {
  profile,
  createPost,
  getPosts,
  getSinglePost,
  editPost,
} = require("../controllers/Blog");

// protected route
router.get("/profile", auth, profile);

router.get("/getPosts", getPosts);

router.get("/post/:id", getSinglePost);

router.post("/createPost", auth, uploadMiddleware.single("file"), createPost);

router.put("/editPost/:id", auth, uploadMiddleware.single("file"), editPost);

module.exports = router;
