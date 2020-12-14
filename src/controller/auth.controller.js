class authController {
    async login(ctx, next) {
        //首先得拿到用户信息吧
        const { name } = ctx.request.body;

        //用户登录成功后返回给客户端的信息
        ctx.body = `登录成功, 欢迎${name}回来`;
     }
}

module.exports = new authController();