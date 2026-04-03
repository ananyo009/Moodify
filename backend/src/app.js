

const express = require('express');

const cookieParser = require('cookie-parser')

const authRouter = require('./Routes/auth.routes')

const songRouter = require('./Routes/songs.routes')

const cors = require('cors')

const path = require('path')

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(
  cors({
    origin: "https://moodify-u98o.onrender.com",
    credentials: true,
  }),
);

app.use('/api/users/', authRouter)

app.use('/api/songs/', songRouter);

console.log(__dirname);

app.use(express.static(path.join(__dirname, "../public/dist")));

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dist", "index.html"));
});




module.exports = app;

