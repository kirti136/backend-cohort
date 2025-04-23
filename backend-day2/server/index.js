const express = require("express");
const rateLimit = require("express-rate-limit");
const tasksRoutes = require("./routes/tasks");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 60,
});

app.use(limiter);
app.use(auth);
app.use("/api", tasksRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
