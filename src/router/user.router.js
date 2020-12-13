const router = require("koa-router");
const verifyUsers = require('../middleware/user.middleware');

const {
    create
} = require("../controller/user.controller");

const userRouter = new router({prefix: '/users'});

//需要注意的是这里只负责注册接口，具体的操作还得进行提取
userRouter.post('/', verifyUsers, create);

module.exports = userRouter;