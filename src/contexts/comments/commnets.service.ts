import { NextFunction, Request, Response } from "express";
import CommnetModel from "./commnets.model";

class CommentService {
  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = Number(req.params.postId);
      if (isNaN(postId)) throw new Error("PostId is not a Vaild");

      const { content } = req.body;
      if (!content.trim()) throw new Error("No content");

      const comment = await CommnetModel.createComment(postId, content);

      res.json(comment);
    } catch (e) {
      next(e);
    }
  }

  async getAllComments(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = Number(req.params.postId);
      if (isNaN(postId)) throw new Error("PostId is not a Vaild");

      const comment = await CommnetModel.getAllComments(postId);
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }

  async getComment(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = Number(req.params.postId);
      const commentId = Number(req.params.commentId);

      if (isNaN(postId) || isNaN(commentId))
        throw new Error("PostId or CommentId is not a Vaild");

      const comment = await CommnetModel.getComment(postId, commentId);
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }

  async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = Number(req.params.postId);
      const commentId = Number(req.params.commentId);

      if (isNaN(postId) || isNaN(commentId))
        throw new Error("PostId or CommentId is not a Vaild");

      const { content } = req.body;
      if (!content.trim()) throw new Error("No content");

      const comment = await CommnetModel.updateCommnet(
        postId,
        commentId,
        content
      );

      res.json(comment);
    } catch (e) {
      next(e);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = Number(req.params.postId);
      const commentId = Number(req.params.commentId);

      if (isNaN(postId) || isNaN(commentId))
        throw new Error("PostId or CommentId is not a Vaild");

      const comment = await CommnetModel.deleteCommnet(postId, commentId);
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
}

const commentService = new CommentService();

export default commentService;
