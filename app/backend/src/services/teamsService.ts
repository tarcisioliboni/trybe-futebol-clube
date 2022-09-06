import ErrorExt from '../error/ErrorExt';
import teamsModel from '../database/models/teamsModel';

const teamsService = {
  async getAll() {
    const teams = await teamsModel.findAll({
      raw: true,
    });
    return teams;
  },

  async getById(id: number) {
    const res = await teamsModel.findOne({ where: { id }, raw: true });
    if (!res) throw new ErrorExt('There is no team with such id!', 404);
    return res;
  },
};

export default teamsService;
