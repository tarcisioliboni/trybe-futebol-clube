import usersModel from '../database/models/usersModel';

const loginService = {
  async getUser(email: string) {
    const user = await usersModel.findOne({
      where: { email },
    });
    return user;
  },
};

export default loginService;
