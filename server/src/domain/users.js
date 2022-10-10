const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const findUsers = () => prisma.user.findMany({
    include: {
        profile: true
    }
})

const findUserByEmail = (email) => prisma.user.findFirst({
    where: {
        email: email
    }
})

const findUserById = (id) => prisma.user.findFirst({
    where: {
        id: id
    },
    include: {
        profile: true
    }
})

const createUser = (lowerCaseEmail, hashedPassword) => prisma.user.create({
    data: {
        email: lowerCaseEmail,
        password: hashedPassword
    }
})

module.exports = {
    findUsers,
    findUserByEmail,
    createUser,
    findUserById
}