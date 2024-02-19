import { NextFunction, Request, Response } from "express";
import likeModel from "./like.model";

class LikeService {
  async createLikedPost(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedUserId = Number(req.user?.id);
      const parsedPostId = Number(req.params.postId);
      if (isNaN(parsedUserId) || isNaN(parsedPostId))
        throw new Error("Not a valid userId or postId!");

      const likedPost = await likeModel.createListedPost(
        parsedUserId,
        parsedPostId
      );

      res.json(likedPost);
    } catch (e) {
      next(e);
    }
  }

  async getLikedPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedUserId = Number(req.user?.id);
      if (isNaN(parsedUserId)) throw new Error("Not a valid userId !");

      const likedPosts = await likeModel.getLikedPosts(parsedUserId);
      res.json(likedPosts);
    } catch (e) {
      next(e);
    }
  }

  async deleteLikedPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedUserId = Number(req.user?.id);
      if (isNaN(parsedUserId)) throw new Error("Not a valid userId !");

      const parsedPostId = Number(req.params.postId);
      if (isNaN(parsedPostId)) throw new Error("Not a valid postId !");

      const deletedPostId = await likeModel.deleteLikedPost(
        parsedUserId,
        parsedPostId
      );
      res.json(deletedPostId);
    } catch (e) {
      next(e);
    }
  }
}

const likeService = new LikeService();

export default likeService;
