import { Router } from 'express';
import leaderboardController from '../controller/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardController.leaderboardHome);

export default leaderboardRouter;
