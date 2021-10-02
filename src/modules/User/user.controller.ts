import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {

  constructor() { }

  async create(req: Request, res: Response) {

    const { name, email, fone, password, confirmPassword } = req.body;

    const userService = new UserService();

    await userService.create({
      name,
      email,
      fone,
      password,
      confirmPassword
    });

    return res.json({
      message: "User created successfully!"
    });
  }

  async editUserById(req: Request, res: Response) {

    const { id } = req.params;

    const { name, email, fone, oldPassword, password, confirmPassword } = req.body;

    const userService = new UserService();

    const user = await userService.editUserById({
      id: parseInt(id),
      name,
      email,
      fone,
      password,
      oldPassword,
      confirmPassword
    });

    return res.json(user);

  }

  async findUserById(req: Request, res: Response) {

    const { id } = req.params;

    const userService = new UserService();

    const user = await userService.findUserById(parseInt(id));

    if (user === 404) {
      return res.status(404).json({
        error: 'User not found!'
      });
    }

    return res.status(200).json(user);
  }

  async findAll(req: Request, res: Response) {

    const userService = new UserService();

    const query = req.query;
    
    const users = await userService.findAll(query);

    if (users === 404) {
      return res.status(404).json({
        error: 'Users not found!'
      });
    }
    return res.status(200).json(users);
    
  }
}
