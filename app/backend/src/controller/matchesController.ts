import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

const matchesController = {
  async allTeams(_req: Request, res:Response) {
    const matchRes = await matchesService.getAll();
    return res.status(200).json(matchRes);
  },

  async addMatch(req: Request, res: Response) {
    const newMatch = await matchesService.addMatch(req.body);
    return res.status(201).json(newMatch);
  },
};

export default matchesController;
