import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

const matchesController = {
  async allTeams(_req: Request, res:Response) {
    const matchRes = await matchesService.getAll();
    return res.status(200).json(matchRes);
  },

  async addMatch(req: Request, res: Response) {
    await matchesService.validateMatches(req.body);
    const matchRes = await matchesService.addMatch(req.body);
    return res.status(201).json(matchRes);
  },

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await matchesService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  },
};

export default matchesController;
