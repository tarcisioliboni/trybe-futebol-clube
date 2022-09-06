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
