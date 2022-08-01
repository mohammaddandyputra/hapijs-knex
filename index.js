require('dotenv').config()
const Hapi = require('@hapi/hapi');
const knex = require('./config/knex');
const { routes } = require("./routes/api");
const authJWT = require('hapi-auth-jwt2');
const JWT = require('jsonwebtoken')

const validate = async (request, decoded) => {
    const getUsers = await knex("users")
      .returning("*")
      .then(async (result) => {
        const findUser = result.filter(({ id }) => id === request.id);
        if (!findUser) {
          return { isValid: false };
        }
        return { isValid: true, credentials: findUser };
      });
    return getUsers;
};

const authorization = {
  plugin: require('hapi-acl-auth'),
  options: {
    handler: async function (request, h) {
      const token = request.headers.authorization.split(' ');
      const role = JWT.decode(token[1]).role;
  
      return {roles: role}
    },
  }
}

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    
    await server.register(authJWT);
    await server.register(authorization);

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.SECRET_KEY,
        validate,
        verifyOptions: { algorithms: "HS256" },
    });

    server.auth.default("jwt");

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();