import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

const teamsController = {
  async allTeams(_req: Request, res:Response) {
    const teamsRes = await teamsService.getAll();
    return res.status(200).json(teamsRes);
  },
};

export default teamsController;
