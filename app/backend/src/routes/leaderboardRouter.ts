import { Router } from 'express';
import leaderboardController from '../controller/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardController.leaderboardHome);
leaderboardRouter.get('/away', leaderboardController.leaderboardAway);
leaderboardRouter.get('/', leaderboardController.leaderboardAll);

export default leaderboardRouter;
