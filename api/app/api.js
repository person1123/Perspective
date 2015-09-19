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
    
    Promise.all([
      DBModel.Topic.findAll().then((topics) => {
        response.topics = topics;
      }),
      DBModel.Article.findAll().then((articles) => {
        response.articles = articles;
      })
    ]).then(() => {
      res.json(response);
    });
  });

  app.get('/topics/:topic_id', (req, res) => {
    let response = {};
    let id = req.params.topic_id;
    
    Promise.all([
      DBModel.Topic.findById(id).then((topics) => {
        response.topic = topics;
      }),
      DBModel.Article.findAll({
        where: {topicId: id}
      }).then((articles) => {
        response.articles = articles;
      })
    ]).then(() => {
      res.json(response);
    });
  });
})();
