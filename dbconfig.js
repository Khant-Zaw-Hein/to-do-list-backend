
const config = {
    user :'sa',
    password :'localadmin',
    server:'127.0.0.1',
    // server:'15.0.2000.5',
    database:'Todo',
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'KZH-PC',
        trustServerCertificate: true
    },
    port : 1433
}

module.exports = config; 