import { inMatch } from '../interfaces';
import matchesModel from '../database/models/matchesModel';
import teamsModel from '../database/models/teamsModel';
import ErrorExt from '../error/ErrorExt';
import teamsService from './teamsService';

const matchesService = {
  async validateMatches(match: inMatch) {
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      throw new ErrorExt('It is not possible to create a match with two equal teams', 401);
    }
    const homeTeamCheck = await teamsService.getById(homeTeam);
    const awayTeamCheck = await teamsService.getById(awayTeam);
    if (!homeTeamCheck || !awayTeamCheck) {
      throw new ErrorExt('There is no team with such id!', 404);
    }
  },

  async getAll() {
    const resGetAll = await matchesModel.findAll({
      include: [
        {
          model: teamsModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: teamsModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return resGetAll;
  },

  async addMatch(match: inMatch) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const resAdd = await matchesModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    }, { raw: true });
    return resAdd;
  },

  async finishMatch(id: number) {
    const resFinish = await matchesModel.update({
      inProgress: false,
    }, { where: { id } });
    return resFinish;
  },

  async upMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const resMatch = await matchesModel.update({
      awayTeamGoals,
      homeTeamGoals,
    }, { where: { id } });
    return resMatch;
  },

};

export default matchesService;
