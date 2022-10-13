const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createAccessToken, createRefreshToken } = require('./auth');

const hashRate = 8;

const {
  findUsers,
  findUserByEmail,
  createUser,
  findUserById,
} = require('../domain/users');

const getAllUsers = async (req, res) => {
  console.log('gettin all users');
  try {
    const foundUsers = await findUsers();

    if (!foundUsers) {
      return res.status(409).json({ error: { msg: 'Users not found' } });
    }

    return res.status(200).json({ data: foundUsers });
  } catch (error) {
    res.status(500).json({ error: { msg: '500 Fail' } });
  }
};

const createNewUser = async (req, res) => {
  console.log('creating new user');
  const { email, password } = req.body;

  const lowerCaseEmail = email.toLowerCase();

  try {
    const existingUser = await findUserByEmail(email);
    console.log('existingUser', existingUser);

    if (existingUser) {
      return res
        .status(409)
        .json({ error: { msg: 'User already exists with this email' } });
    }

    const hashedPassword = await bcrypt.hash(password, hashRate);
    console.log('hashedPassword', hashedPassword);

    const newUser = await createUser(lowerCaseEmail, hashedPassword);
    console.log('new', newUser);

    return res.status(201).json({ data: newUser });
  } catch (error) {
    res.status(500).json({ error: { msg: '500 Fail' } });
  }
};

const getUserById = async (req, res) => {
  console.log('get user by id');
  const id = Number(req.params.id);

  try {
    const foundUser = await findUserById(id);
    console.log('foundUser', foundUser);

    if (!foundUser) {
      return res.status(404).json({ error: { msg: 'User not found' } });
    }

    return res.status(200).json({ data: foundUser });
  } catch (error) {
    res.status(500).json({ error: { msg: '500 Fail' } });
  }
};

const editUserById = async (req, res) => {
  console.log('editing profile');
  const id = Number(req.params.id);
  
  // if profile fields = '' use user.profile.thing to use whats already set
  try {
    const foundUser = await findUserById(id);
    console.log('foundUser', foundUser);

    if (!foundUser) {
      return res.status(404).json({ error: { msg: 'User not found' } });
    }
    
  } catch (error) {
    res.status(500).json({ error: { msg: '500 Fail' } });
  }
};

const login = async (req, res) => {
  console.log('logging you in');

  const { email, password } = req.body;
  console.log('req.body', req.body);

  try {
    // check if user exists
    // WHEN WE FIND THE USER IT FINDS THEIR HASHED PASSEDWORD IN THE DB
    const foundUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!foundUser)
      return res.status(404).json({ error: 'User does not exist ' });
    console.log('found user', foundUser);
    console.log('found user id', foundUser.id);

    // compare passworded entered and hashed password in db
    const passwordsMatch = await bcrypt.compare(password, foundUser.password);
    console.log('passwordsMatch', passwordsMatch);

    if (!passwordsMatch) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const accessToken = createAccessToken(foundUser.id, foundUser.email);

    // const refreshToken = createRefreshToken(foundUser.email)
    // user.refreshToken = refreshToken

    res.status(200).json({ data: accessToken });
  } catch (error) {
    console.log('error', error);
  }
};


module.exports = {
  getAllUsers,
  createNewUser,
  editUserById,
  getUserById,
  login
};
