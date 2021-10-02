
import { Request, Response } from 'express';
import { LoginService } from './login.service';

export class LoginController {

    async login(req: Request, res: Response): Promise<any> {

        const loginService = new LoginService();

        const { email, password } = req.body;

        const user = await loginService.login({ email, password });

        return res.status(401).json(user)
    }
}