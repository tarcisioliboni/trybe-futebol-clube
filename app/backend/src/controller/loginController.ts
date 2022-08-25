import { Request, Response } from 'express';
import { sign, SignOptions } from 'jsonwebtoken';
import { inLogin } from '../interfaces';
import loginService from '../services/loginService';

const secret = process.env.JWT_SECRET || 'secret';

const loginController = {
  createToken(data: inLogin) {
    const config: SignOptions = {
      expiresIn: '10d',
      algorithm: 'HS256',
    };
    const token = sign({ data }, secret, config);
    return token;
  },

  async login(req: Request, res:Response) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const checkUser = await loginService.getUser(req.body.email);
    if (!checkUser) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const token = await loginController.createToken(req.body);
    return res.status(200).json({ token });
  },
};

export default loginController;
