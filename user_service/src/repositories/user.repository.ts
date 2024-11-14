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
}
