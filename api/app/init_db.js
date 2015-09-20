(function() {
  'use strict';
  let DBModel = require('./model.js');
  
  // Create the topic table
  // After creation create articles table
  DBModel.Topic.sync({force: true}).then(() => {
    let topics = [
      { name: 'Topic 1' },
      { name: 'Topic 2' },
      { name: 'Topic 3' },
      { name: 'Topic 4' },
      { name: 'Topic 5' },
      { name: 'Topic 6' },
      { name: 'Topic 7' }
    ];
    
    for (let i = 0; i < topics.length; i++) {
      let newTopic = topics[i];
      DBModel.Topic.create(newTopic);
    }

    DBModel.Category.sync({force: true}).then(() => {
      let categories = [
        { name: 'Category 1', topicId: '5' },
        { name: 'Category 2', topicId: '5' },
        { name: 'Category 3', topicId: '5' },
        { name: 'Category 1', topicId: '4' },
        { name: 'Category 2', topicId: '4' },
      ];
      
      for (let i = 0; i < categories.length; i++) {
        let newCategory = categories[i];
        DBModel.Category.create(newCategory);
      }
      
      DBModel.Article.sync({force: true}).then(() => {
        let articles = [
          { name: 'Article 1', link: 'http://google.com', categoryId: 1 },
          { name: 'Article 2', link: 'http://google.com', categoryId: 1 },
          { name: 'Article 3', link: 'http://google.com', categoryId: 5 },
          { name: 'Article 4', link: 'http://google.com', categoryId: 4 },
          { name: 'Article 5', link: 'http://google.com', categoryId: 4 },
          { name: 'Article 6', link: 'http://google.com', categoryId: 5 },
          { name: 'Article 7', link: 'http://google.com', categoryId: 2 },
          { name: 'Article 8', link: 'http://google.com', categoryId: 2 },
          { name: 'Article 9', link: 'http://google.com', categoryId: 2 },
          { name: 'Article 10', link: 'http://google.com', categoryId: 3 },
          { name: 'Article 11', link: 'http://google.com', categoryId: 3 },
          { name: 'Article 12', link: 'http://google.com', categoryId: 3 },
          { name: 'Article 13', link: 'http://google.com', categoryId: 3 }
        ];

        for (let i = 0; i < articles.length; i++) {
          let newArticle = articles[i];
          DBModel.Article.create(newArticle);
        }
      });
    });
  });  
})();
