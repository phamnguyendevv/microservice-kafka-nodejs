import { PrismaClient } from "@prisma/client";
import { IUsersRepository } from "../interface/userRepository.interface";
import { Users } from "../models/user.model";

export class UserRepository implements IUsersRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async register(data: Users): Promise<Users> {
    return this._prisma.users.create({
      data,
    });
  }
  async findUser(name: string): Promise<Users | null> {
    if (!name) {
      throw new Error("Name parameter is required.");
    }

    return this._prisma.users.findFirst({
      where: { name },
    });
  }

  async getBalance(id: number): Promise<{ balance: number | null }> {
    const user = await this._prisma.users.findFirst({
      where: { id },
      select: {
        balance: true,
      },
    });

    if (user) {
      return user; // Return the selected fields directly
    }

    throw new Error("User not found");
  }
}
