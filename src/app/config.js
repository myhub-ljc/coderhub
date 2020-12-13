const dotenv = require('dotenv');

//这个只需要调用它的config就行
dotenv.config();

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = process.env;

// const {APP_PORT} = process.env;
// module.exports = {
//     APP_PORT
// }