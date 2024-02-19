import prismaClient from "../../prisma/client.prisma";

async function createComment(postId: number, content: string) {
  const commnet = await prismaClient.comment.create({
    data: { postId, content },
    select: { id: true, post: true, content: true },
  });

  return commnet;
}

async function getAllComments(postId: number) {
  const comments = await prismaClient.comment.findMany({
    where: { postId },
    select: { id: true, post: true, content: true },
  });

  return comments;
}

async function getComment(postId: number, commentId: number) {
  const comment = await prismaClient.comment.findUnique({
    where: { id: commentId, postId },
    select: { id: true, post: true, content: true },
  });

  return comment;
}

async function updateCommnet(
  postId: number,
  commentId: number,
  content: string
) {
  const comment = await prismaClient.comment.update({
    data: { content },
    where: { id: commentId, postId },
    select: { id: true, post: true, content: true },
  });

  return comment;
}

async function deleteCommnet(postId: number, commentId: number) {
  const comment = await prismaClient.comment.delete({
    where: { id: commentId, postId },
  });

  return comment;
}

const CommnetModel = {
  createComment,
  getAllComments,
  getComment,
  updateCommnet,
  deleteCommnet,
};

export default CommnetModel;
