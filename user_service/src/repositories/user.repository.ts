import { PrismaClient } from "@prisma/client";
import { IUsersRepository } from "../interface/userRepository.interface";
import { Users } from "../models/user.model";

export class UserRepository implements IUsersRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async register(data: any): Promise<any> {
    return this._prisma.user.create({
      data,
    });
  }
  async findUser(email: string): Promise<any | null> {
    if (!email) {
      throw new Error("email parameter is required.");
    }

    return this._prisma.user.findFirst({
      where: { email },
    });
  }

  async findUserById(id: number): Promise<any> {
    return this._prisma.user.findFirst({
      where: { id },
    });
  }

  async updateUser(id: number, data: any): Promise<any> {
    return this._prisma.user.update({
      where: { id },
      data,
    });
  }

  //=======================================================Status=========================================================
  async getStatus(id: number): Promise<any> {
    return this._prisma.user_status.findFirst({
      where: { id },
    });
  }
  async createStatus(data: any): Promise<any> {
    return this._prisma.user_status.create({
      data,
    });
  }

  async updateStatus(id: number, data: any): Promise<any> {
    return this._prisma.user_status.update({
      where: { id },
      data,
    });
  }

  async deleteStatus(id: number): Promise<any> {
    return this._prisma.user_status.delete({
      where: { id },
    });
  }

  //=======================================================Role=========================================================
  async getRole(id: number): Promise<any> {
    return this._prisma.user_role.findFirst({
      where: { id },
    });
  }

  async createRole(data: any): Promise<any> {
    return this._prisma.user_role.create({
      data,
    });
  }

  async updateRole(id: number, data: any): Promise<any> {
    return this._prisma.user_role.update({
      where: { id },
      data,
    });
  }

  async deleteRole(id: number): Promise<any> {
    return this._prisma.user_role.delete({
      where: { id },
    });
  }

  async getBalance(id: number): Promise<{ balance: number | null }> {
    const user = await this._prisma.user.findFirst({
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
