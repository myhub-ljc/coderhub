const authService = require('../services/auth.service');
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
    };

    async detail(ctx, next) {
        //为了获取某条动态，我们得先要拿到请求到参数id;
        const momentId = ctx.params.momentId;

        //根据id去请求数据
        const result = await momentService.getMomentById(momentId);

        ctx.body = result;
    };

    async list(ctx, next) {
        //得先获取到offset,size参数
        const { offset, size } = ctx.query;

        //根据offset, size去请求数据
        const result = await momentService.getMomentByList(offset, size);

        ctx.body = result;
    };

    async update(ctx, next) {
        const { momentId } = ctx.params;
        const { content } = ctx.request.body;

        const result = await momentService.update(content, momentId);

        ctx.body = result;
    }
}

module.exports = new momentController();