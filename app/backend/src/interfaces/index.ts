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
