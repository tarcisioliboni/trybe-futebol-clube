import { Router } from 'express';
import matchesController from '../controller/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.allTeams);
matchesRouter.post('/', matchesController.addMatch);

export default matchesRouter;
