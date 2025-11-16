import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const User = prisma.User;

function createUser(data) {
    return prisma.user.create({ data });
}

function getUserById(id) {
    return prisma.user.findUnique({ where: { id } });
}

function getAllUsers() {
    return prisma.user.findMany();
}

function updateUser(id, data) {
    return prisma.user.update({ where: { id }, data });
}

function deleteUser(id) {
    return prisma.user.delete({ where: { id } });
}

export { createUser, getUserById, getAllUsers, updateUser, deleteUser }; 
