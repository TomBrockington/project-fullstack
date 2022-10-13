const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  findAllPosts,
  createPost
} = require('../domain/posts');

const {
  findUserById
} = require('../domain/users');

const getAllPosts = async (req, res) => {
  console.log('gettin all posts');

  try {
    const foundPosts = await findAllPosts();

    if (!foundPosts) {
      return res.status(409).json({ error: { msg: 'Posts not found' } });
    }

    return res.status(200).json({ data: foundPosts });
  } catch (error) {
    return res.status(500).json({ error: { msg: '500 Fail' } });
  }
};

const createNewPost = async (req, res) => {
  console.log('creating new posts');
  const { userId, content } = req.body
  console.log('req', content);

  if (!content) {
    return res.status(409).json({ error: { msg: 'You must enter some content' } });
  }

  try {
    const foundUser = await findUserById(userId)
    if (!foundUser) {
      return res.status(409).json({ error: { msg: 'Users not found' } });
    }
    console.log('found', foundUser);

    const createdPost = await createPost(userId, content)
    console.log('post', createdPost);

    if(!createdPost) {
      return res.status(409).json({ error: { msg: 'Post failed to post - didnt fit' } });
    }
    return res.status(200).json({ data: createdPost });

  } catch (error) {
   return res.status(500).json({ error: { msg: '500 Fail' } });
  }
}


module.exports = {
  getAllPosts,
  createNewPost
};
