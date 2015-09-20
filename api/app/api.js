(function() {
  'use strict';

  // Dependencies
  let cors = require('cors');
  let app = require('express')();
  let parse = require('body-parser');
  let DBModel = require('./model.js');

  // Create the server
  app.use(cors());
  app.use(parse.json());
  require('http').createServer(app).listen('3000');
  
  app.get('/topics', (req, res) => {
    let response = {};
    
    DBModel.Topic.findAll({
      include: [{
        model: DBModel.Category,
        include: [DBModel.Article]
      }],
      order: [
        ['createdAt', 'DESC']
      ],
      limit: 6
    }).then((topics) => {
      response.topics = topics;
      res.json(response);
    });
  });

  app.post('/topics', (req, res) => {
    let body = req.body;
    
    let topic = body.topic;
    let articles = body.articles;
    let categories = body.categories;

    DBModel.Topic.create(topic);

    for (let i = 0; i < articles.length; i++) {
      let newArticle = articles[i];
      DBModel.Article.create(newArticle);
    }
    
    for (let i = 0; i < categories.length; i++) {
      let newCategory = categories[i];
      DBModel.Category.create(newCategory);
    }
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
