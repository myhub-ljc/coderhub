const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');

class authController {
    async login(ctx, next) {
        console.log(ctx.user);

        const { id, name } = ctx.user;
        const token = jwt.sign({id, name}, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })

        //用户登录成功后返回给客户端的信息
        ctx.body = {
            id, 
            name,
            token
        }
     }
}

module.exports = new authController();