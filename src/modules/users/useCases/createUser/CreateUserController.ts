import { Response, Request } from 'express';
import { z } from 'zod';
import { CreateUserUseCase } from './CreateUserUseCase';

// Define o esquema de validação usando Zod
const createClientSchema = z.object({
    name: z.string().min(1, { message: 'Nome é obrigatório' }),
    phone: z.string().min(10, { message: 'Telefone deve ter mais de 10 caracteres' }),
    email: z.string().email({ message: 'Formato do email é invalido' }),
    cpf: z.string(),
    birthday: z.coerce.date({ message: 'Formato de data invalido' }),
    user_type: z.string().min(3, { message: 'O tipo de usuário deve ter mais de 3 caracteres' }),
    password: z.string().min(6, { message: 'A senha deve ter mais de 10 caracteres' })
});


class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
        
        // Valida os dados de entrada do corpo da requisição usando Zod
        const validatedData = createClientSchema.parse(request.body);

        const user = await this.createUserUseCase.execute(validatedData);

      return response.status(201).json(user);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController };