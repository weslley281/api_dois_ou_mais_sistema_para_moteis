import { DataTypes } from 'sequelize';
import { connection } from '../db';

const userModel = connection.define('users', {
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

function createTableUser() {
  return userModel.sync({ force: false }).then(() => {
    console.log('*******Tabela de cliente criada com sucesso*******');
  });
}

export { userModel, createTableUser };