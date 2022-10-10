const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function seed() {
  const password = await bcrypt.hash('123', 8);

  const createdUser = await prisma.user.create({
    data: {
      email: 'maxpower@email.com',
      password,
    },
  });

  const createProfile = await prisma.profile.create({
    data: {
      userId: createdUser.id,
      fullName: 'maximus power',
      bio: 'loves the simpsons',
    },
  });

  const createPost = await prisma.post.create({
    data: {
      userId: createdUser.id,
      content: 'maximus power posting',
    },
  });

  const createdUser2 = await prisma.user.create({
    data: {
      email: 'jerry@email.com',
      password,
    },
  });

  const createProfile2 = await prisma.profile.create({
    data: {
      userId: createdUser2.id,
      fullName: 'Jerry splat',
      bio: 'loves the simpsons',
    },
  });

  const createPost2 = await prisma.post.create({
    data: {
      userId: createdUser2.id,
      content: ' power posting',
    },
  });

  const createdUser3 = await prisma.user.create({
    data: {
      email: 'thirdicus@email.com',
      password,
    },
  });

  const createProfile3 = await prisma.profile.create({
    data: {
      userId: createdUser3.id,
      fullName: 'john the third',
      bio: 'loves the simpsons',
    },
  });

  const createPost3 = await prisma.post.create({
    data: {
      userId: createdUser3.id,
      content: 'bad posting',
    },
  });

  console.log('users', createdUser);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
