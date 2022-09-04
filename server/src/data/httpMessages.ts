type TStatuses = {
  [key: number]: {
    httpMessage: string;
  };
};

const httpMessages: TStatuses = {
  400: { httpMessage: "Bad Request" },
  500: { httpMessage: "Internal Server Error" },
};

export const positiveParam = {
  extraMessage: "Parameter needs to be a positive number:",
  ...httpMessages[400],
  httpStatus: 400,
};

export const missingParam = {
  extraMessage: "Missing parameters in the url:",
  ...httpMessages[400],
  httpStatus: 400,
};

export const outRange = {
  extraMessage: "No data for id:",
  ...httpMessages[400],
  httpStatus: 400,
};

export const serverError = {
  extraMessage: "",
  ...httpMessages[500],
  httpStatus: 500,
};
