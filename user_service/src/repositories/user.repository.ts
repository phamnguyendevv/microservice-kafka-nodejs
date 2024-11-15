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

  async getBalance(
    id: number
  ): Promise<{ id: number , name: string; balance: number | null }> {
    const user = await this._prisma.users.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        balance: true,
      },
    });

    if (user) {
      return user; // Return the selected fields directly
    }

    throw new Error("User not found");
  }
}
