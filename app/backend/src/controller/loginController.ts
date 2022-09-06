import { Request, Response } from 'express';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { inLogin, inToken } from '../interfaces';
import ErrorExt from '../error/ErrorExt';
import loginService from '../services/loginService';

const secret = process.env.JWT_SECRET || 'secret';

const loginController = {
  async createToken(data: inLogin) {
    const config: SignOptions = {
      expiresIn: '10d',
      algorithm: 'HS256',
    };
    const token = sign({ data }, secret, config);
    return token;
  },

  async validateToken(token: string) {
    try {
      const backInfo = verify(token, secret);
      return backInfo as inToken;
    } catch (err) {
      throw new ErrorExt('Token is not valid', 401);
    }
  },

  async login(req: Request, res:Response) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g;
    const { email, password } = req.body;
    if (!emailRegex.test(email) || (password.length < 6)) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const checkUser = await loginService.getUser(req.body.email);
    if (!checkUser) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const token = await loginController.createToken(req.body);
    return res.status(200).json({ token });
  },

  async validate(req: Request, res:Response) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const { data: { email } } = await loginController.validateToken(token);
    const user = await loginService.getUser(email);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    return res.status(200).json({ role: user.role });
  },
};

export default loginController;
