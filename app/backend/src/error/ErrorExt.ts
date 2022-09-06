class ErrorExt extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = statusCode;
  }
}

export default ErrorExt;
