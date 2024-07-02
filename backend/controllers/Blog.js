const userModel = require("../models/user");
const postModel = require("../models/post");
const fs = require("fs");

exports.profile = async (req, res) => {
  try {
    const { id } = req.user;
    // find the user details
    const user = await userModel.findOne({ _id: id }).lean();
    user.password = undefined;

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Cannot show the user profile!",
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { id } = req.user;

    // fetch post data
    const { title, summary, content } = req.body;
    const { originalname, path } = req.file;

    // rename the uploaded file
    const extension = `.${req.file.mimetype.split("/")[1]}`;
    const newPath = originalname.split(".")[0] + extension;
    fs.renameSync(path, `uploads\\${newPath}`);

    // add the post data in the database
    let createdFile = await postModel.create({
      title,
      summary,
      content,
      cover: newPath,
      author: id,
    });

    // successful response
    res.status(200).json({
      success: true,
      data: createdFile,
      message: "Post Created Successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Post cannot be created",
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("author", ["username"])
      .limit(20);
    res.status(200).json({
      success: true,
      data: posts,
      message: "Posts Fetched Successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Posts cannot be fetched",
    });
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id).populate("author", ["username"]);

    res.status(200).json({
      success: true,
      data: post,
      message: "Single Post Data Fetched Successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Cannot fetch single post data",
    });
  }
};

exports.editPost = async (req, res) => {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;

      // rename the uploaded file
      const extension = `.${req.file.mimetype.split("/")[1]}`;
      newPath = originalname.split(".")[0] + extension;
      fs.renameSync(path, `uploads\\${newPath}`);
    }

    const { title, summary, content } = req.body;

    const { id } = req.params;
    const post = await postModel.findById(id);

    const updatedPost = await postModel.findByIdAndUpdate(id, {
      title,
      summary,
      content,
      cover: newPath ? newPath : post.cover,
    });

    // successful response
    res.status(200).json({
      success: true,
      data: updatedPost,
      message: "Post Updated Successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Cannot update the post",
    });
  }
};
