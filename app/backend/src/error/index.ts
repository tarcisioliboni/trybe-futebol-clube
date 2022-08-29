class TokenErr extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenErr';
  }
}

export default TokenErr;
