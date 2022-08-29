import { Router } from 'express';
import loginController from '../controller/loginController';

const loginRouter = Router();

loginRouter.post('/', loginController.login);
loginRouter.get('/validate', loginController.validate);

export default loginRouter;
