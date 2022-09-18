import { inTeamData, inMatch, inGoalsMatch } from '../interfaces';

export const homeGoalsStatus = (matches: inMatch[]): inGoalsMatch[] => matches.map((match) => {
  let status = '';
  if (match.homeTeamGoals > match.awayTeamGoals) status = 'winner';
  if (match.homeTeamGoals === match.awayTeamGoals) status = 'draw';
  if (match.homeTeamGoals < match.awayTeamGoals) status = 'loser';
  return {
    status,
    homeTeamGoals: match.homeTeamGoals,
    awayTeamGoals: match.awayTeamGoals,
  };
});

export const awayGoalsStatus = (matches: inMatch[]): inGoalsMatch[] => matches.map((match) => {
  let status = '';
  if (match.homeTeamGoals < match.awayTeamGoals) status = 'winner';
  if (match.homeTeamGoals === match.awayTeamGoals) status = 'draw';
  if (match.homeTeamGoals > match.awayTeamGoals) status = 'loser';
  return {
    status,
    homeTeamGoals: match.homeTeamGoals,
    awayTeamGoals: match.awayTeamGoals,
  };
});

export const allGoalsStatus = (matches: inMatch[], id: number): inGoalsMatch[] => {
  const checkHomeGoalsStatus = homeGoalsStatus(matches.filter((match) => match.homeTeam === id));
  const checkAwayGoalsStatus = awayGoalsStatus(matches.filter((match) => match.awayTeam === id));
  return [...checkHomeGoalsStatus, ...checkAwayGoalsStatus];
};

export const totalVDL = (matches: inGoalsMatch[]) => {
  let totalVictories = 0; let totalDraws = 0; let totalLosses = 0;
  matches.forEach((match) => {
    if (match.status === 'winner') totalVictories += 1;
    if (match.status === 'draw') totalDraws += 1;
    if (match.status === 'loser') totalLosses += 1;
  });
  return { totalVictories, totalDraws, totalLosses };
};

export const leaderboardHome = (matches: inGoalsMatch[]) => {
  let goalsFavor = 0; let goalsOwn = 0;
  matches.forEach((mat) => { goalsFavor += mat.homeTeamGoals; goalsOwn += mat.awayTeamGoals; });
  const { totalVictories, totalDraws, totalLosses } = totalVDL(matches);
  const totalPoints = totalVictories * 3 + totalDraws;
  const totalGames = matches.length;
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  const goalsBalance = goalsFavor - goalsOwn;
  return {
    totalVictories,
    totalDraws,
    totalPoints,
    totalLosses,
    totalGames,
    efficiency,
    goalsFavor,
    goalsOwn,
    goalsBalance };
};

export const leaderboardAway = (matches: inGoalsMatch[]) => {
  let goalsFavor = 0; let goalsOwn = 0;
  matches.forEach((mat) => { goalsFavor += mat.awayTeamGoals; goalsOwn += mat.homeTeamGoals; });
  const { totalVictories, totalDraws, totalLosses } = totalVDL(matches);
  const totalPoints = totalVictories * 3 + totalDraws;
  const totalGames = matches.length;
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  const goalsBalance = goalsFavor - goalsOwn;
  return {
    totalVictories,
    totalDraws,
    totalPoints,
    totalLosses,
    totalGames,
    efficiency,
    goalsFavor,
    goalsOwn,
    goalsBalance };
};

export const allGoals = (matches: inGoalsMatch[]) => {
  let goalsFavor = 0; let goalsOwn = 0;
  matches.forEach((mat) => {
    const goals = [mat.awayTeamGoals, mat.homeTeamGoals];
    const biggerValueGoal = (Math.max(...goals)); const smallerValueGoal = (Math.min(...goals));
    if (mat.status === 'draw') { goalsFavor += mat.homeTeamGoals; goalsOwn += mat.homeTeamGoals; }
    if (mat.status === 'winner') { goalsFavor += biggerValueGoal; goalsOwn += smallerValueGoal; }
    if (mat.status === 'loser') { goalsFavor += smallerValueGoal; goalsOwn += biggerValueGoal; }
  });
  const goalsBalance = goalsFavor - goalsOwn;
  return { goalsFavor, goalsOwn, goalsBalance };
};

export const leaderboardAll = (matches: inGoalsMatch[]) => {
  const { totalVictories, totalDraws, totalLosses } = totalVDL(matches);
  const totalPoints = totalVictories * 3 + totalDraws;
  const totalGames = matches.length;
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  const insertAllGoals = allGoals(matches);
  return {
    totalVictories,
    totalDraws,
    totalPoints,
    totalLosses,
    totalGames,
    efficiency,
    ...insertAllGoals };
};

export const leaderboardSort = (result: inTeamData[]) => result.sort((a, b) => {
  if (b.totalPoints > a.totalPoints) return 1;
  if (b.totalPoints < a.totalPoints) return -1;
  if (b.totalVictories > a.totalVictories) return 1;
  if (b.totalVictories < a.totalVictories) return -1;
  if (b.goalsBalance > a.goalsBalance) return 1;
  if (b.goalsBalance < a.goalsBalance) return -1;
  if (b.goalsFavor > a.goalsFavor) return 1;
  if (b.goalsFavor < a.goalsFavor) return -1;
  if (b.goalsOwn > a.goalsOwn) return -1;
  if (b.goalsOwn < a.goalsOwn) return 1;
  return 0;
});
