const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const findAllPosts = () => prisma.post.findMany({});

const createPost = (userId, content) =>
  prisma.post.create({
    data: {
      userId: userId,
      content: content,
    },
  });

module.exports = {
  findAllPosts,
  createPost,
};
