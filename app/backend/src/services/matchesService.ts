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
};

export default matchesService;
