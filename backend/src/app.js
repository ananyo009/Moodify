

const express = require('express');

const cookieParser = require('cookie-parser')

const authRouter = require('./Routes/auth.routes')

const songRouter = require('./Routes/songs.routes')

const cors = require('cors')


const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  }),
);

app.use('/api/users/', authRouter)

app.use('/api/songs/', songRouter);

app.use(express.static("../public"))


const path = require('path') ;
const { fileURLToPath } = require("url");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Serve static files from the frontend build folder
// Adjust the path '../../frontend/dist' to match your folder structure
app.use(express.static(path.join(__dirname, "../public")));

// 2. THE CATCH-ALL ROUTE (Fixes the /login 404)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});


module.exports = app