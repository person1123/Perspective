(function() {
  'use strict';
  let DBModel = require('./model.js');
  
  DBModel.Topic.sync({force: true}).then(() => {
    let topics = [
      { name: 'Topic 1' },
      { name: 'Topic 2' },
      { name: 'Topic 3' },
      { name: 'Topic 4' },
      { name: 'Topic 5' },
      { name: 'Topic 6' },
    ];
    
    for (let i = 0; i < topics.length; i++) {
      let newTopic = topics[i];
      DBModel.Topic.create(newTopic);
    }

    DBModel.Category.sync({force: true}).then(() => {
      let categories = [
        { name: 'Category 1', topicId: '1' },
        { name: 'Category 2', topicId: '1' },
      ];
      
      for (let i = 0; i < categories.length; i++) {
        let newCategory = categories[i];
        DBModel.Category.create(newCategory);
      }
      
      DBModel.Article.sync({force: true}).then(() => {
        let articles = [
          { name: 'Article 1', link: 'http://google.com', categoryId: 1, rank: 1.1 },
          { name: 'Article 2', link: 'http://google.com', categoryId: 1, rank: 1.2 },
          { name: 'Article 3', link: 'http://google.com', categoryId: 1, rank: 1.3 },
          { name: 'Article 4', link: 'http://google.com', categoryId: 1, rank: 1.4 },
          { name: 'Article 5', link: 'http://google.com', categoryId: 1, rank: 1.5 },
          { name: 'Article 6', link: 'http://google.com', categoryId: 2, rank: 1.6 },
          { name: 'Article 7', link: 'http://google.com', categoryId: 2, rank: 1.7 },
          { name: 'Article 8', link: 'http://google.com', categoryId: 2, rank: 1.8 },
          { name: 'Article 9', link: 'http://google.com', categoryId: 2, rank: 1 },
        ];

        for (let i = 0; i < articles.length; i++) {
          let newArticle = articles[i];
          DBModel.Article.create(newArticle);
        }
      });
    });
  });  
})();
