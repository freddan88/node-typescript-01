type TCustomError = {
  extraMessage: string;
  httpMessage: string;
  httpStatus: number;
};

export class CustomError extends Error {
  extraMessage: string;
  httpMessage: string;
  httpStatus: number;

  constructor(errors: TCustomError, params: string[] = []) {
    super();

    Error.captureStackTrace(this, this.constructor);

    (this.extraMessage = `${errors.extraMessage} ${params.join(", ")}`.trim()),
      (this.httpMessage = errors.httpMessage),
      (this.httpStatus = errors.httpStatus),
      (this.name = this.constructor.name);
  }
}
