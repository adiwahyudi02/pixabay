const PIXABAY_API_KEY = "47087283-d96ec9c42e31693617a6e55e3";

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    return res.status(200).json({ key: PIXABAY_API_KEY });
  }

  return res.status(401).json({ message: "Invalid username or password" });
};

module.exports = { login };
