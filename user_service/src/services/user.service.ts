import { IUsersRepository } from "../interface/userRepository.interface";

export class UserService {
  private _repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this._repository = repository;
  }

  async registerUser(input: any) {
    const data = await this._repository.register(input);
    if (!data.id) {
      throw new Error("unable to register user");
    }
    return data;
  }
  async findUser(input: any) {
    const data = await this._repository.findUser(input);
    return data;
  }
  async findUserById(id: number) {
    const data = await this._repository.findUserById(id);
    if (!data) {
      throw new Error("Not get User!");
    }
    return data;
  }

  async updateUser(id: number, data: any) {
    const user = await this._repository.updateUser(id, data);
    if (!user) {
      throw new Error("Not Update User!");
    }
    return user;
  }

  async getStatusUser(id: number) {
    const data = await this._repository.getStatus(id);
    if (data) {
       return data;
    }
   
  }

  async createStatusUser(data: any) {
    const status = await this._repository.createStatus(data);
    if (!status) {
      throw new Error("Not Create Status User!");
    }
    return status;
  }

  async updateStatusUser(id: number, data: any) {
    const status = await this._repository.updateStatus(id, data);
    if (!status) {
      throw new Error("Not Update Status User!");
    }
    return status;
  }

  async deleteStatusUser(id: number) {
    const status = await this._repository.deleteStatus(id);
    if (!status) {
      throw new Error("Not Delete Status User!");
    }
    return status;
  }

  async getRoleUser(id: number) {
    const data = await this._repository.getRole(id);
    if (!data) {
      throw new Error("Not Get Role User!");
    }
    return data;
  }

  async createRoleUser(data: any) {
    const role = await this._repository.createRole(data);
    if (!role) {
      throw new Error("Not Create Role User!");
    }
    return role;
  }

  async updateRoleUser(id: number, data: any) {
    const role = await this._repository.updateRole(id, data);
    if (!role) {
      throw new Error("Not Update Role User!");
    }
    return role;
  }

  async deleteRoleUser(id: number) {
    const role = await this._repository.deleteRole(id);
    if (!role) {
      throw new Error("Not Delete Role User!");
    }
    return role;
  }

  async getBalanceUser(id: number) {
    const data = await this._repository.getBalance(id);
    if (!data) {
      throw new Error("Not Get Balance User!");
    }
    return data;
  }
}
