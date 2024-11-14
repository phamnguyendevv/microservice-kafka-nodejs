import { Users } from "../models/user.model";

export interface IUsersRepository {
  register(data: Users): Promise<Users>;
}

