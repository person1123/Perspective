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
  app.use(parse.urlencoded({
    extended: true
  }));
  require('http').createServer(app).listen('3000');
  
  app.get('/topics', (req, res) => {
    let response = {};
    
    DBModel.Topic.findAll({
      include: [{
        model: DBModel.Category,
        include: [DBModel.Article]
      }],
      order: [
        [DBModel.Category, DBModel.Article, 'rank', 'DESC']
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
    DBModel.Topic.findOrCreate({
      where: {
        name: topic
      }
    }).spread((newTopic) => {
      let topicId = newTopic.id;
      let categories = Object.keys(body.categories);
      
      for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let articles = body.categories[category];

        DBModel.Category.findOrCreate({
          where: {
            name: category,
            topicId: topicId
          }
        }).spread((newCategory) => {
          for (let i = 0; i < articles.length; i++) {
            let article = articles[i];
            let categoryId = newCategory.id;
            DBModel.Article.findOrCreate({
              where: {
                name: article.title,
                categoryId: categoryId
              }, defaults: {
                link: article.url,
                rank: article.rank
              }});
          }
        });
      }
    });
    res.json('success');
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
