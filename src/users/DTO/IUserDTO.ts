interface ICreateUserDTO {
  user_id?: number;
  name: string;
  phone: string;
  email: string;
  birthday: string;
  user_type: string;
  cpf: string
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export { ICreateUserDTO };