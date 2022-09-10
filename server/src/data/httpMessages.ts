type TStatuses = {
  [key: number]: {
    httpMessage: string;
  };
};

const httpMessages: TStatuses = {
  // https://httpstatuses.org
  100: { httpMessage: "Continue" },
  102: { httpMessage: "Processing" },
  200: { httpMessage: "OK" },
  201: { httpMessage: "Created" },
  202: { httpMessage: "Accepted" },
  204: { httpMessage: "No Content" },
  400: { httpMessage: "Bad Request" },
  401: { httpMessage: "Unauthorized" },
  403: { httpMessage: "Forbidden" },
  404: { httpMessage: "Not Found" },
  405: { httpMessage: "Method Not Allowed" },
  408: { httpMessage: "Request Timeout" },
  418: { httpMessage: "I'm a teapot" },
  429: { httpMessage: "Too Many Requests" },
  500: { httpMessage: "Internal Server Error" },
  501: { httpMessage: "Not Implemented" },
  503: { httpMessage: "Service Unavailable" },
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
