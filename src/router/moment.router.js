const Router = require('koa-router');

const {
    create,
    detail,
    list
} = require('../controller/moment.controller');

const {
    verifyAuth 
} = require('../middleware/auth.middleware');

const momentRouter = new Router({prefix: '/moment'});

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);

module.exports = momentRouter;