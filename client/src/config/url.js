import { DEVELOPMENT, PRODUCTION } from "./node.env";

const setBaseUrl = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV == DEVELOPMENT) return "http://localhost:3001";
  if (NODE_ENV == PRODUCTION) return "http://api.fosha.tk";

  return "http://localhost:3001";
};

export const API_URL = setBaseUrl();
