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

  console.log('users', createdUser);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
