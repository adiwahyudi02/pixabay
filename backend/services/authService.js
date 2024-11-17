// Simulate business logic like checking a database, if needed
const validateCredentials = (username, password) => {
  return username === "admin" && password === "admin";
};

module.exports = { validateCredentials };
