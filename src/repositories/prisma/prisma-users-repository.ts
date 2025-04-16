import { prisma } from "src/lib/prisma";
import { Prisma, User } from "generated/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        return user
    }
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }


}