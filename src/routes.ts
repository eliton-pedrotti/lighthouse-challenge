import { Router } from 'express';
import { LoginController } from './modules/Login/login.controller';
import { UserController } from './modules/User/user.controller';
import ensureAuthenticated from '../src/middlewares/authenticated';

const router = Router();

const userController = new UserController();
const loginController = new LoginController();

router.post('/user', userController.create);
router.post('/login', loginController.login);

router.get('/user/:id', ensureAuthenticated, userController.findUserById);
router.get('/users', ensureAuthenticated, userController.findAll);

router.put('/edit/:id', ensureAuthenticated, userController.editUserById)

export default router;