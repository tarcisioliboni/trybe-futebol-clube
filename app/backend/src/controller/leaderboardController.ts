import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboardService';

const leaderboardController = {
  async leaderboardHome(_req: Request, res: Response) {
    const resLeaderboardHome = await leaderboardService.getAllHomeLeaderboard();
    res.status(200).json(resLeaderboardHome);
  },
  async leaderboardAway(_req: Request, res: Response) {
    const resLeaderboardAway = await leaderboardService.getAllAwayLeaderboard();
    res.status(200).json(resLeaderboardAway);
  },
};

export default leaderboardController;
