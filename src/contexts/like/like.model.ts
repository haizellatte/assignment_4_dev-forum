import prismaClient from "../../prisma/client.prisma";

async function createListedPost(userId: number, postId: number) {
  const likePost = await prismaClient.like.create({
    data: { isLiked: true, userId, postId },
  });

  return likePost;
}

async function getLikedPosts(userId: number) {
  const likePost = await prismaClient.like.findMany({
    where: { userId: userId, isLiked: true },
  });

  return likePost;
}

async function deleteLikedPost(userId: number, postId: number) {
  const likePost = await prismaClient.like.deleteMany({
    where: { userId: userId, postId: postId },
  });

  return likePost;
}

const likeModel = {
  createListedPost,
  getLikedPosts,
  deleteLikedPost,
};

export default likeModel;
