const bcrypt = require('bcrypt')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const users = [
    {
      id: 1,
      username: 'admin',
      password: bcrypt.hashSync('123123', 10),
      role: 'ADMIN'
    },
    {
      id: 2,
      username: 'user',
      password: bcrypt.hashSync('123123', 10),
      role: 'USER'
    },
  ]

  await knex('users').insert(users);
};
