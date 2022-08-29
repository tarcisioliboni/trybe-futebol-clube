import { Router } from 'express';
import teamsController from '../controller/teamsController';

const teamsRouter = Router();

teamsRouter.get('/', teamsController.allTeams);

export default teamsRouter;
