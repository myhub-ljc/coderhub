const service = require('../services/user.service');

class UserController {
    async create(ctx, next) {
        //1,获取用户请求的参数
        const user = ctx.request.body;

        //2,根据请求去查询数据库(当然了，这里是将用户的注册信息进行存储的)（而这部分逻辑也需要进行一个提取）
        const result = await service.create(user);

        //3,将查询到的数据返回
        ctx.body = result;
    }
}

module.exports = new UserController();