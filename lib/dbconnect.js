var { Pool, Client } = require('pg');

var lib = {};

lib.pgpool = new Pool({
  user: process.env.PGSQL_USERNAME,
  host: process.env.PGSQL_HOST,
  database: process.env.PGSQL_DATABASE,
  password: process.env.PGSQL_PASSWORD,
  port: process.env.PGSQL_PORT
});

module.exports = lib;