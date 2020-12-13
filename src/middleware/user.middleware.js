const errorTypes = require('../constants/error-types');
const service = require('../services/user.service');

const verifyUsers = async (ctx, next) => {
    const { name, password } = ctx.request.body;

    if(!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    const result = await service.getUserName(name);
    if(result.length) {
        const error = new Error(errorTypes.NMAE_AIREADY_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }

    await next();
};

module.exports = verifyUsers;