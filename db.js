const Pool = require("pg").Pool;

const pool = new Pool(
    {
        user: "postgres",
        password: "D@t@b@s3",
        host: "localhost",
        port: 5432,
        database: "partiesDB"
    }
);

module.exports = pool;
//idk what modules are or why export default doesn't work but ok