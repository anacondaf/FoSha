const bcrypt = require("bcrypt");

const saltRounds = 10;

const hash = async (myPlaintextPassword) => {
  const hashPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
  return hashPassword;
};

const verify = async (plaintextPassword, hashPassword) => {
  const isValidPassword = await bcrypt.compare(plaintextPassword, hashPassword);
  return isValidPassword;
};

module.exports = {
  hash,
  verify,
};
