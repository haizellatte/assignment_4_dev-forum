import { Router } from "express";
import authController from "./auth/auth.controller";
import commentControllers from "./comments/comments.controller";
import likeController from "./like/like.controller";
import postController from "./posts/post.controller";

const controllers = Router();

controllers.use("/auth", authController);
controllers.use("/", postController);
controllers.use("/posts", likeController);
controllers.use("/posts", commentControllers);

export default controllers;
