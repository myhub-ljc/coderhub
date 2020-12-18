const connection = require('../app/database');

class momentService {
    async create(userId, content) {
        const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`;
        const [result] = await connection.execute(statement, [userId, content]);
        return result;
    };

    async getMomentById(id) {
        const statement = `
        SELECT 
            m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
            JSON_OBJECT('id', u.id, 'name', u.name) auth
        FROM moment m 
        LEFT JOIN users u ON m.user_id = u.id 
        WHERE m.id = ?;`;
        const [result] = await connection.execute(statement, [id]);
        return result[0];
    }
}

module.exports = new momentService();