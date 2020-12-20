const connection = require('../app/database');

// const sqlFragment = `
//     SELECT 
//     m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
//     JSON_OBJECT('id', u.id, 'name', u.name) auth
//     FROM moment m 
//     LEFT JOIN users u ON m.user_id = u.id 
// `;

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
    };

    async getMomentByList(offset, size) {
        const statement = `
        SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount 
        FROM moment m 
        LEFT JOIN users u ON m.user_id = u.id 
        LIMIT ?, ?;
        `;
        const [result] = await connection.execute(statement, [offset, size]);
        return result;
    };

    async update(content, momentId) {
        const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
        const result = await connection.execute(statement, [content, momentId]);
        return result;
    };

    async remove(momentId) {
        const statement = `DELETE FROM moment WHERE id = ?;`;
        const result = await connection.execute(statement, [momentId]);
        return result;
    }
}

module.exports = new momentService();