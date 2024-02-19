import { NextFunction, Request, Response } from "express";
import postModel from "./post.model";

class PostService {
  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const parsedUserId = Number(userId);
      if (!userId) {
        return res.json("로그인이 필요한 서비스입니다. 로그인을 해주세요.");
      }

      const parsedBoardId = Number(req.params.boardId);
      const { title, content } = req.body;

      const post = await postModel.createPost(
        title,
        content,
        parsedUserId,
        parsedBoardId
      );

      res.json(post);
    } catch (e) {
      res.sendStatus(402);
      next(e);
    }
  }

  async getNewestPostsPerTenPage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const newestPosts = await postModel.getNewestPostsPerTenPage();
      if (!newestPosts) {
        return res.json(
          "💡 작성된 게시물이 없습니다. 첫 게시물을 작성해보세요!"
        );
      }

      res.json(newestPosts);
    } catch (e) {
      res.sendStatus(400);
      next(e);
    }
  }

  async getAllFEPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const FEPosts = await postModel.getAllFEPosts();
      if (!FEPosts) {
        return res.json(
          "💡 작성된 FE 게시물이 없습니다. 첫 게시물을 작성해보세요!"
        );
      }

      res.json(FEPosts);
    } catch (e) {
      res.sendStatus(400);
      next(e);
    }
  }

  async getAllBEPost(req: Request, res: Response, next: NextFunction) {
    try {
      const BEPosts = await postModel.getAllFEPosts();
      if (!BEPosts) {
        return res.json(
          "💡 작성된 BE 게시물이 없습니다. 첫 게시물을 작성해보세요!"
        );
      }

      res.json(BEPosts);
    } catch (e) {
      res.sendStatus(400);
      next(e);
    }
  }

  async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedPostsId = Number(req.params.postId);
      if (isNaN(parsedPostsId)) throw new Error("Not a valid postId!");

      const { title, content } = req.body;
      if (!title.trim()) throw new Error("No title");
      if (!content.trim()) throw new Error("No content");

      const updatedPost = await postModel.updatePost(
        parsedPostsId,
        title,
        content
      );

      res.json(updatedPost);
    } catch (e) {
      res.sendStatus(400);
      next(e);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedPostsId = Number(req.params.postId);
      if (isNaN(parsedPostsId)) throw new Error("Not a valid postId!");

      const deletePost = await postModel.deletePost(parsedPostsId);
      console.log(deletePost);
      res.json(`${parsedPostsId}게시물이 삭제되었습니다.`);
    } catch (e) {
      res.sendStatus(400);
      next(e);
    }
  }
}

const postService = new PostService();

export default postService;
