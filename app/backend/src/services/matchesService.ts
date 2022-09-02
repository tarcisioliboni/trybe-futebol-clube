import { inMatch } from '../interfaces';
import matchesModel from '../database/models/matchesModel';
import teamsModel from '../database/models/teamsModel';
import ErrMid from '../error';

const matchesService = {
  async validateMatches(match: inMatch) {
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      throw new ErrMid('It is not possible to create a match with two equal teams', 401);
    }
    const homeTeamCheck = await teamsModel.findOne({ where: { id: homeTeam } });
    const awayTeamCheck = await teamsModel.findOne({ where: { id: awayTeam } });
    if (!homeTeamCheck || !awayTeamCheck) {
      throw new ErrMid('There is no team with such id!', 404);
    }
  },

  async getAll() {
    const allMaches = await matchesModel.findAll({
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
    return allMaches;
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
    const finishRes = await matchesModel.update({
      inProgress: false,
    }, { where: { id } });
    return finishRes;
  },
};

export default matchesService;
