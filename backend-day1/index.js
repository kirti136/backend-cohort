const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve uploaded files read-only
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    fallthrough: false,
    immutable: true,
    maxAge: "1d",
  })
);

// Routes
const uploadRoute = require("./routes/upload");
app.use("/api", uploadRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
