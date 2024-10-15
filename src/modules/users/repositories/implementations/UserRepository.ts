import { userModel } from '../../../../database/models/users';
import { User } from '../../model/User';
import { ICreateUserDTO, IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {

  private static INSTANCE: UserRepository;

  public static getInstance() {
    if (!UserRepository.INSTANCE) {
      UserRepository.INSTANCE = new UserRepository();
    }

    return UserRepository.INSTANCE;
  }

  async create({
    name,
    phone,
    email,
    birthday,
    user_type,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user: any = await userModel.create({
      name,
      phone,
      email,
      birthday,
      user_type,
      password,
    });

    return user;
  }

  async update({
    user_id,
    name,
    phone,
    email,
    birthday,
    user_type,
  }: ICreateUserDTO): Promise<Object> {
    const user: any = await userModel.update(
      { name, phone, email, birthday, user_type },
      { where: { user_id: user_id } }
    );

    if (user) {
      return {
        user_id,
        name,
        phone,
        email,
        birthday,
        user_type,
      };
    } else {
      return { message: 'Error' };
    }
  }

  async findById(user_id: number): Promise<User> {
    const user: any = await userModel.findOne({ where: { user_id: user_id } });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: any = await userModel.findOne({ where: { email: email } });

    return user;
  }

  // Implementação do método findByName
  async findByName(name: string): Promise<User[]> {
    const users: any = await userModel.findAll({ where: { name: name } });

    return users;
  }

  // Implementação do método findByCPF
  async findByCPF(cpf: string): Promise<User> {
    const user: any = await userModel.findOne({ where: { cpf: cpf } });

    return user;
  }

  // Implementação do método changePrivileges
  async changePrivileges(user_id: number, user_type: string): Promise<User> {
    const user: any = await userModel.update(
      { user_type: user_type },
      { where: { user_id: user_id } }
    );

    const updatedUser: any = await userModel.findOne({ where: { user_id: user_id } });

    return updatedUser;
  }

  async findAllUser(): Promise<User[]> {
    const users: any = await userModel.findAll();

    return users;
  }
}

export { UserRepository };
