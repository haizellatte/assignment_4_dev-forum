import prismaClient from "../../prisma/client.prisma";

//* 1. 게시물 CREATE
async function createPost(
  title: string,
  content: string,
  userId: number,
  boardId: number
) {
  const post = await prismaClient.post.create({
    data: {
      title,
      content,
      userId,
      boardId,
    },
  });

  return post;
}

//* 2. 게시판별(FE/BE)로 최신 글을 10개 씩 SSR 방식으로 렌더링(READ)
async function getNewestPostsPerTenPage() {
  const FEPosts = await prismaClient.post.findMany({
    select: {
      board: true,
      title: true,
      content: true,
      createdAt: true,
      comment: true,
      like: true,
    },
    where: { boardId: 1 },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const BEPosts = await prismaClient.post.findMany({
    select: {
      board: true,
      title: true,
      content: true,
      createdAt: true,
      comment: true,
      like: true,
    },
    where: { boardId: 2 },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const NewestPosts = [...FEPosts, ...BEPosts];

  return NewestPosts;
}

//* 3. 전체 FE 게시물 READ (최신순)
async function getAllFEPosts() {
  const getFEPosts = await prismaClient.post.findMany({
    select: {
      title: true,
      content: true,
      createdAt: true,
      comment: true,
      like: true,
    },
    where: { boardId: 1 },
    orderBy: { createdAt: "desc" },
  });

  return getFEPosts;
}

//* 4. 전체 BE 게시물 READ (최신순)
async function getAllBEPosts() {
  const getBEPosts = await prismaClient.post.findMany({
    select: {
      title: true,
      content: true,
      createdAt: true,
      comment: true,
      like: true,
    },
    where: { boardId: 2 },
    orderBy: { createdAt: "desc" },
  });

  return getBEPosts;
}

//* 5. 게시물 UPDATE
async function updatePost(postId: number, title: string, content: string) {
  const updatedPost = await prismaClient.post.update({
    data: {
      title,
      content,
    },
    where: {
      id: postId,
    },
  });

  return updatedPost;
}

//* 6. 게시물 DELETE
async function deletePost(postId: number) {
  const deletePost = await prismaClient.post.delete({
    where: {
      id: postId,
    },
  });

  return deletePost;
}

const postModel = {
  createPost,
  getNewestPostsPerTenPage,
  getAllFEPosts,
  getAllBEPosts,
  updatePost,
  deletePost,
};

export default postModel;
