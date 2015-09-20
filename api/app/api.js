(function() {
  'use strict';

  // Dependencies
  let cors = require('cors');
  let app = require('express')();
  let DBModel = require('./model.js');

  // Create the server
  app.use(cors());
  require('http').createServer(app).listen('3000');
  
  app.get('/topics', (req, res) => {
    let response = {};
    
    DBModel.Topic.findAll({
      include: [{
        model: DBModel.Category,
        include: [DBModel.Article]
      }]
    }).then((topics) => {
      response.topics = topics;
      res.json(response);
    });
  });

  app.get('/topics/:topic_id', (req, res) => {
    let response = {};
    let id = req.params.topic_id;

    DBModel.Topic.findById(id, {
      include: [{
        model: DBModel.Category,
        include: [DBModel.Article]
      }]
    }).then((topics) => {
      response.topics = topics;
      res.json(response);
    });
  });
})();
