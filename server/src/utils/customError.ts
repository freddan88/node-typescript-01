type TStatus = {
  code: number;
  description: string;
};

type TStatuses = {
  [key: number]: TStatus;
};

const httpStatuses: TStatuses = {
  204: { code: 204, description: "No Content" },
  400: { code: 400, description: "Bad Request" },
  500: { code: 500, description: "Internal Server Error" },
};

export class CustomError extends Error {
  status: number;
  message: string;
  constructor({ status }: any) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status;
    this.message = httpStatuses[status].description;
  }
}
