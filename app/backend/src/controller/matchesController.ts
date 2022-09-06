import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

const matchesController = {
  async allTeams(req: Request, res:Response) {
    const resAllTeams = await matchesService.getAll();
    return res.status(200).json(resAllTeams);
  },

  async addMatch(req: Request, res: Response) {
    await matchesService.validateMatches(req.body);
    const resAddMatch = await matchesService.addMatch(req.body);
    return res.status(201).json(resAddMatch);
  },

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const resFinishMatch = await matchesService.finishMatch(Number(id));
    return res.status(200).json(resFinishMatch);
  },

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const resUpdateMatch = await matchesService.upMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json(resUpdateMatch);
  },
};

export default matchesController;
