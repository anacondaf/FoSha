import { DEVELOPMENT, PRODUCTION } from "./node.env";

const setBaseUrl = () => {
	const { REACT_APP_ENV } = process.env;

<<<<<<< Updated upstream
	console.log(REACT_APP_ENV);
=======
  if (NODE_ENV == DEVELOPMENT) return "http://localhost:3001";
  if (NODE_ENV == PRODUCTION) return "http://api.fosha.tech";
>>>>>>> Stashed changes

	if (REACT_APP_ENV == DEVELOPMENT) return "http://localhost:3001";
	if (REACT_APP_ENV == PRODUCTION) return "http://api.fosha.tk";

	return "http://localhost:3001";
};

export const API_URL = setBaseUrl();
