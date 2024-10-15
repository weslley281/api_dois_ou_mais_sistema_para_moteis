import { ICreateUserDTO } from '../DTO/IUserDTO';
import { User } from '../model/User';

interface IUserRepository {
  create({
    name,
    phone,
    email,
    birthday,
    user_type,
    password,
  }: ICreateUserDTO): Promise<User>;
  update({
    name,
    phone,
    email,
    birthday,
    user_type,
  }: ICreateUserDTO): Promise<Object>;
  findById(user_id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByName(name: string): Promise<User[]>;
  findByCPF(cpf: string): Promise<User>;
  changePrivileges(user_id: number, user_type: string): Promise<User>;
  findAllUser(): Promise<User[]>;
}

export { IUserRepository, ICreateUserDTO };