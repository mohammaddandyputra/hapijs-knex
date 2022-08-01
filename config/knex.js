module.exports = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : '',
      database : 'belajar-hapijs-knex'
    }
});