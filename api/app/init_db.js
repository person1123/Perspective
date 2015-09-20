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
        { name: 'Category 1', topicId: '1' },
        { name: 'Category 2', topicId: '1' },
        { name: 'Category 3', topicId: '1' },
        { name: 'Category 1', topicId: '2' },
        { name: 'Category 2', topicId: '2' },
      ];
      
      for (let i = 0; i < categories.length; i++) {
        let newCategory = categories[i];
        DBModel.Category.create(newCategory);
      }
      
      DBModel.Article.sync({force: true}).then(() => {
        let articles = [
          { name: 'Article 1', summary: 'Summary 1', categoryId: 1 },
          { name: 'Article 2', summary: 'Summary 2', categoryId: 1 },
          { name: 'Article 3', summary: 'Summary 3', categoryId: 5 },
          { name: 'Article 4', summary: 'Summary 4', categoryId: 4 },
          { name: 'Article 5', summary: 'Summary 5', categoryId: 4 },
          { name: 'Article 6', summary: 'Summary 6', categoryId: 5 },
          { name: 'Article 7', summary: 'Summary 7', categoryId: 2 },
          { name: 'Article 8', summary: 'Summary 8', categoryId: 2 },
          { name: 'Article 9', summary: 'Summary 9', categoryId: 2 },
          { name: 'Article 10', summary: 'Summary 10', categoryId: 3 },
          { name: 'Article 11', summary: 'Summary 11', categoryId: 3 },
          { name: 'Article 12', summary: 'Summary 12', categoryId: 3 },
          { name: 'Article 13', summary: 'Summary 13', categoryId: 3 }
        ];

        for (let i = 0; i < articles.length; i++) {
          let newArticle = articles[i];
          DBModel.Article.create(newArticle);
        }
      });
    });
  });  
})();
