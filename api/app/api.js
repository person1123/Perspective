(function() {
  'use strict';

  // Dependencies
  let app = require('express')();
  let Sequelize = require('sequelize');

  let pg_ip = process.env.HACKDB_PORT_5432_TCP_ADDR;
  let orm = new Sequelize('postgres://' + pg_ip + ':5432/hackmit');

  app.get('/', (req, res) => {
    res.json('I faked ur bitch');
  });
})();
