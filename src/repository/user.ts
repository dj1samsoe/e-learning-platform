import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class UserRepository {
  protected prisma = prisma;

  get collection() {
    return this.prisma.user;
  }

  async findMany(args: Prisma.UserFindManyArgs) {
    const data = await this.collection.findMany(args);
    return data;
  }

  async findUnique(args: Prisma.UserFindUniqueArgs) {
    const data = await this.collection.findUnique(args);
    return data;
  }

  async count() {
    const count = await this.collection.count();
    return count;
  }

  async create(args: Prisma.UserCreateArgs) {
    const data = await this.collection.create(args);
    return data;
  }

  async update(args: Prisma.UserUpdateArgs) {
    const data = await this.collection.update(args);
    return data;
  }

  async delete(args: Prisma.UserDeleteArgs) {
    const data = await this.collection.delete(args);
    return data;
  }
}
