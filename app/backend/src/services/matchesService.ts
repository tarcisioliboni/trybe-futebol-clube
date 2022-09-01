import { inMatch } from '../interfaces';
import matchesModel from '../database/models/matchesModel';
import teamsModel from '../database/models/teamsModel';

const matchesService = {
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
};

export default matchesService;
