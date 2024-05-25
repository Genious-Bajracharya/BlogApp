import asyncHandler from "express-async-handler";
import { BlogModel } from "../models/blogModel.js";
import Comment from "../models/commentModel.js";

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await BlogModel.find();
  res.status(200).json(blogs);
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  const comments = await Comment.find({ blogId: req.params.id });
  console.log(comments);
  blog.view_count += 1;
  await blog.save();

  if (!blog) {
    throw new Error("There is no blog with id " + req.params.id);
  } else {
    res.status(200).json({ blog, comments });
  }
});

const createBlog = asyncHandler(async (req, res) => {
  const { title, content, authorId, co_AuthorId } = req.body;
  if (!title || !content || !authorId) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const blog = await BlogModel.create({
    title,
    content,
    author: authorId,
    co_AuthorId,
  });
  if (!blog) {
    res.status(400);
    throw new Error("Invalid Blog Data");
  } else {
    res.status(201).json({
      title: blog.title,
      content: blog.content,
      authorId: blog.authorId,
      co_AuthorId: blog.co_AuthorId,
    });
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, authorId, co_AuthorId } = req.body;

  const blog = await BlogModel.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Invalid Blog Not Found");
  } else {
    blog.title = title;
    blog.content = content;
    blog.author = authorId;
    blog.co_Author = co_AuthorId;
    const updatedBlog = await blog.save();
    res.status(201).json(updatedBlog);
  }
});

const likes_count_increase = asyncHandler(async (req, res) => {
  const likes = await BlogModel.findById(req.params.id);
  likes.likes_count += 1;
  await likes.save();
  res.json(likes);
});
const likes_count_decrease = asyncHandler(async (req, res) => {
  const likes = await BlogModel.findById(req.params.id);
  likes.likes_count -= 1;
  await likes.save();
  res.json(likes);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);

  if (blog) {
    await Comment.deleteMany({ blogId: req.params.id });
    const d = await BlogModel.findByIdAndDelete(req.params.id);
    res.json(d);
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

export {
  createBlog,
  getBlogs,
  getBlogById,
  likes_count_increase,
  likes_count_decrease,
  updateBlog,
  deleteBlog,
};
