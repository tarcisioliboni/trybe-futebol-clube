import matchesModel from '../database/models/matchesModel';
import teamsModel from '../database/models/teamsModel';
import { homeGoalsStatus, leaderboardHome,
  leaderboardSort, awayGoalsStatus, leaderboardAway } from '../helpers/leaderbordBusinessRules';

const leaderboardService = {
  async getAllHomeLeaderboard() {
    const teams = await teamsModel.findAll();
    const allHomeTeams = await Promise.all(teams.map(async (team) => {
      const homeTeamMatches = await matchesModel
        .findAll({ where: { homeTeam: team.id, inProgress: 0 } });
      const matchesStatus = homeGoalsStatus(homeTeamMatches);
      const homeTeamLeaderboard = leaderboardHome(matchesStatus);
      return {
        name: team.teamName,
        ...homeTeamLeaderboard,
      };
    }));
    return leaderboardSort(allHomeTeams);
  },
  async getAllAwayLeaderboard() {
    const teams = await teamsModel.findAll();
    const allAwayTeams = await Promise.all(teams.map(async (team) => {
      const awayTeamMatches = await matchesModel
        .findAll({ where: { awayTeam: team.id, inProgress: 0 } });
      const matchesStatus = awayGoalsStatus(awayTeamMatches);
      const awayTeamLeaderboard = leaderboardAway(matchesStatus);
      return {
        name: team.teamName,
        ...awayTeamLeaderboard,
      };
    }));
    return leaderboardSort(allAwayTeams);
  },
};

export default leaderboardService;
