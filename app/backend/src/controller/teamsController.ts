import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

const teamsController = {
  async allTeams(_req: Request, res:Response) {
    const teamsRes = await teamsService.getAll();
    return res.status(200).json(teamsRes);
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await teamsService.getById(+id);
    res.status(200).json(response);
  },
};

export default teamsController;
