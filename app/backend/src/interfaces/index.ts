export interface inLogin {
  username: string;
  email: string;
}

export interface inToken {
  data: {
    email: string,
    password: string,
  }
}

export interface inMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

export interface inGoalsMatch {
  status: string,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface inTeamData {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export interface inId extends inMatch {
  id: number,
}

export interface inIdMatch extends inId, inMatch { }
