const config = require('./dbConfig'),
    sql = require('mssql');

const getDB = async () => {
    try{
        let pool = await sql.connect(config);
        let data = pool.request().query("SELECT * from SearchTable");
        console.log(data);
        return data;
    }
    catch (e) {
        console.log(e)
    }
}
module.exports = {
    getDB
}