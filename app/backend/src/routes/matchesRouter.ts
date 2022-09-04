import { Router } from 'express';
import matchesController from '../controller/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.allTeams);
matchesRouter.post('/', matchesController.addMatch);
matchesRouter.patch('/:id/finish', matchesController.finishMatch);
matchesRouter.patch('/:id/', matchesController.updateMatch);

export default matchesRouter;
