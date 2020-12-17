const router = require('koa-router');
const {
    login,
    success
} = require('../controller/auth.controller');
const { 
    verifyLogin,
    verifyAuth
 } = require('../middleware/auth.middleware');

const authRouter = new router();

authRouter.post('/login', verifyLogin, login);
//封装验证授权
authRouter.get('/test', verifyAuth, success);

module.exports = authRouter;