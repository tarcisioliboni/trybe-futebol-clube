import { Router } from 'express';
import matchesController from '../controller/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.allTeams);

export default matchesRouter;
