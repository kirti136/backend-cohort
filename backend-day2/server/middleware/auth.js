module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token === "bhaiyaYehTohTopSecretHai123") return next();
  return res.status(401).json({ message: "Unauthorized" });
};
