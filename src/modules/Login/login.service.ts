import jwt from 'jsonwebtoken';
import db from '../../../db.json';
import bcrypt from 'bcryptjs';
import authConfig from '../../config/auth';

interface ILogin {
    email: string;
    password: string;
}

export class LoginService {
    constructor() { }

    async login({ email, password }: ILogin): Promise<any> {

        const userAlreadyExists = db.users.filter((value) => {
            return value.user.email.endsWith(email)
        });

        if (userAlreadyExists.length < 0) {
            throw new Error("User not found!");
        }

        const checkPass = userAlreadyExists[0].user.password;
        const checkPassword = await bcrypt.compare(password, checkPass);

        if (!checkPassword) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign({ id: userAlreadyExists[0].id }, authConfig.secret, { expiresIn: authConfig.expiresIn });

        return {
            user: {
                id: userAlreadyExists[0].id,
                name: userAlreadyExists[0].user.name,
                email: userAlreadyExists[0].user.email
            },
            token
        };

    }
}