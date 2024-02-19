import { Router } from "express";
import commentService from "./commnets.service";

const commentControllers = Router();

commentControllers.post("/:postId/comments", commentService.createComment);
commentControllers.get("/:postId/comments", commentService.getAllComments);
commentControllers.get("/:postId/:commentId", commentService.getComment);
commentControllers.put("/:postId/:commentId", commentService.updateComment);
commentControllers.delete("/:postId/:commentId", commentService.deleteComment);

export default commentControllers;
