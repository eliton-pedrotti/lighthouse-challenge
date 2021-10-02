import { UserDTO } from "./dto/user.dto";
import bcrypt, { hash } from "bcryptjs";
import { Connection } from '../../database/connection';
import db from '../../../db.json';
import validPass from '../../middlewares/validPassword';

export class UserService {

  constructor() { }

  connection = new Connection();

  async create({ name, email, fone, password, confirmPassword }: UserDTO) {

    if (!email) {
      throw new Error("Email/Password incorrect");
    }

    if (!validPass(password)) {
      throw new Error("The password must contain at least 8 characters, 1 uppercase letter and 1 lowercase letter!");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match!");
    }

    const passwordHash = await hash(password, 8);

    const user = {
      name,
      email,
      fone,
      password: passwordHash
    }

    if (db.users.length < 0) {
      await this.connection.save(user);
    }

    const userAlreadyExists = db.users.filter((value) => {
      return value.user.email.endsWith(email)
    });

    if (userAlreadyExists.length > 0) {
      throw new Error("User already exists");
    }

    await this.connection.save(user);

    return user;
  }

  async editUserById({ id, name, email, fone, oldPassword, password, confirmPassword }: UserDTO) {

    const { user } = await this.connection.get(id);

    if (!email) {
      throw new Error("Email/Password incorrect");
    }

    if (!validPass(password)) {
      throw new Error("The password must contain at least 8 characters, 1 uppercase letter and 1 lowercase letter!");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match!");
    }

    const checkPassword = await bcrypt.compare(oldPassword, user.password);

    if (!checkPassword) {
      throw new Error("Invalid password");
    }

    const passwordHash = await hash(password, 8);

    const editUser = {
      id,
      name,
      email,
      fone,
      password: passwordHash
    }

    return await this.connection.edit(editUser);

  }

  async findUserById(id: number) {
    return await this.connection.get(id);
  }

  async findAll(query) {
    return await this.connection.getAll(query);
  }
}
