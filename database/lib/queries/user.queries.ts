import { prisma } from '../prisma-client';
import { Prisma } from '@prisma/client';
import { NotFoundError } from '../errors';

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new NotFoundError('User not found');
  return user;
}

export async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data });
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: string) {
  return prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
}

export async function getUserWithTrips(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { trips: true },
  });
  if (!user) throw new NotFoundError('User not found');
  return user;
}
