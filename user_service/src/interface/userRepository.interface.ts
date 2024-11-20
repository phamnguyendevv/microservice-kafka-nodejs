import { Users } from "../models/user.model";

export interface IUsersRepository {
  register(data: Users): Promise<Users>;
  findUser(name: string): Promise<any>;
  getBalance(id: number): Promise<{ balance: number | null }>;
}
