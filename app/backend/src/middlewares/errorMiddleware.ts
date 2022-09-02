import { Request, Response } from 'express';
import ErrMid from '../error';

const errorTest = (err: ErrMid, _req: Request, res: Response) => {
  const { message, code } = err;
  res.status(code).json({ message });
};

export default errorTest;
