(function() {
  'use strict';

  // Dependencies
  let app = require('express')();

  // ***Docker Database and ORM creation for later***
  // let Sequelize = require('sequelize');
  // let pg_ip = process.env.HACKDB_PORT_5432_TCP_ADDR;
  // let orm = new Sequelize('postgres://' + pg_ip + ':5432/hackmit');

  // Create the server
  require('http').createServer(app).listen('3000');
  
  app.get('/topics', (req, res) => {
    let response = {
      topics: [
        {
          id: 1,
          name: 'Presidential Race'
        },
        {
          id: 2,
          name: 'Clocks are Bombs'
        },
        {
          id: 3,
          name: 'Cat Food is Great'
        },
        {
          id: 4,
          name: 'Republicans are Vampires'
        },
        {
          id: 5,
          name: 'Cows Go Moo'
        },
        {
          id: 6,
          name: 'Haskell is a language'
        }
      ],
      articles: [
        {
          id: 1,
          name: 'Jesus is Real',
          summary: 'He is really I swore on me mum',
          topic: 1
        }
      ]
    };
    res.json(response);
  });
})();
