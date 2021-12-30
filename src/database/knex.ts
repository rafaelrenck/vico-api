import knexjs from 'knex';

const knexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: <string>process.env.SIGH_DB_HOST,
      port: <string>process.env.SIGH_DB_PORT,
      database: <string>process.env.SIGH_DB_DATABASE,
      user: <string>process.env.SIGH_DB_USERNAME,
      password: <string>process.env.SIGH_DB_PASSWORD,
    },
  },
};

const knex = knexjs(knexConfig.development);

export { knex }
