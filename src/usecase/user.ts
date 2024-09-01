import { UserRepository } from "@/repository/user";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { checkPermission } from "@/lib/auth";
import { PrismaError } from "@/utils/error";
import { ITEM_PER_PAGE } from "@/constant";

type ExpludeField = "createdAt";
type UserCreateInput = Omit<Prisma.UserCreateInput, ExpludeField>;
type UserUncheckedCreateInput = Omit<
  Prisma.UserUncheckedCreateInput,
  ExpludeField
>;

export class UserUseCase {
  private readonly repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getAllUsers({ page }: { page: number }) {
    try {
      const offset = (page - 1) * ITEM_PER_PAGE;
      const users = await this.repository.findMany({
        skip: offset,
        take: ITEM_PER_PAGE,
      });
      return users;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.repository.findUnique({ where: { id } });
      return user;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.repository.findUnique({ where: { email } });
      return user;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }

  async getTotalUsers() {
    try {
      const count = await this.repository.count();
      return count;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }

  async createUser(
    user: Prisma.XOR<UserCreateInput, UserUncheckedCreateInput>
  ) {
    await checkPermission();
    try {
      const data = await this.repository.create({
        data: {
          // id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      });
      return data;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }

  async updateUser(
    user: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>
  ) {
    await checkPermission();

    if (typeof user.id !== "string") {
      throw new Error(
        "use-case: expected product to have an id of type string"
      );
    }

    try {
      const data = await this.repository.update({
        where: { id: user.id },
        data: user,
      });
      return data;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }

  async deleteUser(id: string) {
    await checkPermission();
    try {
      const data = await this.repository.delete({ where: { id } });
      return data;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }
}
