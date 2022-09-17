import matchesModel from '../database/models/matchesModel';
import teamsModel from '../database/models/teamsModel';
import { homeGoalsStatus, leaderboard, leaderboardSort } from '../helpers/leaderbordBusinessRules';

const leaderboardService = {
  async getAllHomeLeaderboard() {
    const teams = await teamsModel.findAll();
    const allHomeTeams = await Promise.all(teams.map(async (team) => {
      const homeTeamMatches = await matchesModel
        .findAll({ where: { homeTeam: team.id, inProgress: 0 } });
      const matchesStatus = homeGoalsStatus(homeTeamMatches);
      const homeTeamLeaderboard = leaderboard(matchesStatus);
      return {
        name: team.teamName,
        ...homeTeamLeaderboard,
      };
    }));
    return leaderboardSort(allHomeTeams);
  },
};

export default leaderboardService;
