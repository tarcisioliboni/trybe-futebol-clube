class ErrMid extends Error {
  public code = 111;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export default ErrMid;
