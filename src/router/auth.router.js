const router = require('koa-router');
const {
    login
} = require('../controller/auth.controller');
const verifyAuth = require('../middleware/auth.middleware');

const authRouter = new router();

authRouter.post('/login', verifyAuth, login);

module.exports = authRouter;