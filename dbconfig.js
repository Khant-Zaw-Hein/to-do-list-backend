const dotenv = require('dotenv')
dotenv.config()

const config = {
    user : process.env.DB_USER,
    password :process.env.DB_PASSWORD,
    server: process.env.MS_SQL_SERVER,
    database:'Todo',
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        // instancename :'to-do-list-db',
        trustServerCertificate: true
    },
    port : 1433
}

module.exports = config; 