import { Router } from "express";
import postService from "./post.service";

const postController = Router();

postController.post("/:boardId", postService.createPost);
postController.get("/", postService.getNewestPostsPerTenPage);
postController.get("/front-end", postService.getAllFEPosts);
postController.get("/back-end", postService.getAllBEPost);
postController.put("/:postId", postService.updatePost);
postController.delete("/:postId", postService.deletePost);

export default postController;
