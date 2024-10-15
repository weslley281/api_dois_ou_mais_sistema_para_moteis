import { User } from '../../model/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { hash } from 'bcrypt';

interface IRequest {
  name: string;
  phone: string;
  email: string;
  cpf: string;
  birthday: Date;
  user_type: string;
  password: string;
}

class CreateUserUseCase {
    constructor(private usersRepository: IUserRepository) {}

    async execute({
        name,
        phone,
        email,
        cpf,
        birthday,
        user_type,
        password,
    }: IRequest): Promise<User> {
        const userEmailAlreadyExists = await this.usersRepository.findByEmail(email);
      
        if (cpf != "" || cpf != null) {
            const userCPFAlreadyExists = await this.usersRepository.findByCPF(cpf);

            if (userCPFAlreadyExists) throw new Error('Usuário já existe');
        }

        if (userEmailAlreadyExists) throw new Error('Usuário já existe');

        const passwordHash = await hash(password, 8);

        return await this.usersRepository.create({
            name,
            phone,
            email,
            cpf,
            birthday,
            user_type,
            password: passwordHash,
        });
    }
}

export { CreateUserUseCase };