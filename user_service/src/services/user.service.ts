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
    if (!data) {
      throw new Error("unable to find user");
    }
    return data;
  }

  async getBalanceUser(id: number) {
    const data = await this._repository.getBalance(id);
    if (!data) {
      throw new Error("Not Get Balance User");
    }
    return data;
  }
}
