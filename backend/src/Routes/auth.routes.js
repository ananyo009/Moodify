const { Router } = require('express')

const controller = require('../controller/auth.controller')

const identifyUser = require('../middleware/auth.indentifyUser')


const authRouter = Router();


authRouter.post('/register', controller.register)

authRouter.post('/login', controller.login)

authRouter.get('/get-me', identifyUser, controller.getMe)

authRouter.post('/logout',controller.logout)


module.exports = authRouter