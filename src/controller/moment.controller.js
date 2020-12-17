const momentService = require('../services/moment.service');

class momentController {
    async create(ctx, next) {
        // 得先拿到user_id, content
        const userId = ctx.user.id;
        const content = ctx.request.body;

        //将数据插入到数据库中去
        const result = await momentService.create(userId, content);

        //将数据返回到前端
        ctx.body = result;
    }
}

module.exports = new momentController();