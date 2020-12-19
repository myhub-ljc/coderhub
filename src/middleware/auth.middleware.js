const jwt = require('jsonwebtoken');

const errorTypes = require('../constants/error-types');
const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const md5Password = require('../utills/password-handle');
const { PUBLIC_KEY } = require('../app/config');

const verifyLogin = async (ctx, next) => {
    //1,首先得拿到用户登录的信息吧；
    const { name, password } = ctx.request.body;

    //2,验证用户名以及密码是不能为空的呢
    if(!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    //3,验证用户是否存在
    const result = await userService.getUserName(name);
    const user = result[0];
    if(!user) {
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }

    //4,验证用户的密码是否正确
    if(md5Password(password) !== user.password) {
        const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
        return ctx.app.emit('error', error, ctx);
    }

    //我们使用一下拿到的user
    ctx.user = user;
    await next();
}

const verifyAuth = async (ctx, next) => {
    console.log("验证授权的middleware");

    //1,获取token
    const authorization = ctx.headers.authorization;
    if(!authorization) {
        const error = new Error(errorTypes.UNAUTHORIATION);
        return ctx.app.emit('error', error, ctx);
    }
    const token = authorization.replace('Bearer ', '');

    //2,验证token
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        });
        ctx.user = result;
        await next();
    } catch (err) {
        const error = new Error(errorTypes.UNAUTHORIATION);
        ctx.app.emit('error', error, ctx);
    }

}

const verifyPermission = async (ctx, next) => {
    console.log('验证了权限的middleware');

    const { momentId } = ctx.params;
    const { id } = ctx.user;

    const isPermission = await authService.checkMoment(momentId, id);
    if(!isPermission) {
        const error = new Error(errorTypes.UNPERMISSION);
        return ctx.app.emit('error', error, ctx);
    }

    await next();
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}