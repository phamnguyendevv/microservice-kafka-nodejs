import { Users } from "../models/user.model";

export interface IUsersRepository {
  register(data: Users): Promise<Users>;
  findUser(email: string): Promise<any>;
  getBalance(id: number): Promise<{ balance: number | null }>;

  //=======================================================Status=========================================================
  getStatus(id: number): Promise<any>;
  createStatus(data: any): Promise<any>;
  updateStatus(id: number, data: any): Promise<any>;
  deleteStatus(id: number): Promise<any>;
  
  
  //=======================================================Role================================================
  getRole(id: number): Promise<any>;
  createRole(data: any): Promise<any>;
  updateRole(id: number, data: any): Promise<any>;
  deleteRole(id: number): Promise<any>;

}
