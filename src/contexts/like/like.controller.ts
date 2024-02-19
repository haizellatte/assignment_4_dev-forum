import { Router } from "express";
import likeService from "./like.service";

const likeController = Router();

likeController.post("/:postId/like", likeService.createLikedPost);
likeController.get("/liked-list", likeService.getLikedPosts);
likeController.delete("/:postId/unlike", likeService.deleteLikedPosts);

export default likeController;
