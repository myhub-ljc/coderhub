const errorTypes = require('../constants/error-types');

const errorHandle = (error, ctx) => {
    let status, message;

    switch(error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400,
            message = '用户名或密码不能为空';
            break;
        case errorTypes.NMAE_AIREADY_EXISTS:
            status = 409,
            message = '用户名已经存在';
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400,
            message = '用户不存在';
            break;
        case errorTypes.PASSWORD_IS_INCORRENT:
            status = 400,
            message = '用户密码不正确';
            break;
        case errorTypes.UNAUTHORIATION:
            status = 401,
            message = '未授权';
            break;
        default:    
            status = 404,
            massage = 'NOT FOUND'
    };

    ctx.status = status;
    ctx.body = message;
}

module.exports = errorHandle;