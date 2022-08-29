import teamsModel from '../database/models/teamsModel';

const teamsService = {
  async getAll() {
    const teams = await teamsModel.findAll({
      raw: true,
    });
    return teams;
  },
};

export default teamsService;
