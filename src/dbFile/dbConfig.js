const config = {
    user: 'ReactApp',
    password: '1234',
    server: 'YOGA',
    database: 'valorant',
    options:{
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    port:4000
}
module.exports = config;