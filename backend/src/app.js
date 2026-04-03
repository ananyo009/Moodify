

const express = require('express');

const cookieParser = require('cookie-parser')

const authRouter = require('./Routes/auth.routes')

const songRouter = require('./Routes/songs.routes')

const cors = require('cors')


const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/users/', authRouter)

app.use('/api/songs/', songRouter);

app.use(express.static("./public"))


const path = require('path')
const __dirname = path.resolve();

app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


module.exports = app