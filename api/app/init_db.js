(function() {
  'use strict';
  let DBModel = require('./model.js');
  
  // Create the topic table
  // After creation create articles table
  DBModel.Topic.sync({force: true}).then(() => {
    let topics = [
      { id: 1, name: 'Presidential Race' },
      { id: 2, name: 'Clocks are Bombs' },
      { id: 3, name: 'Cat Food is Great' },
      { id: 4, name: 'Republicans are Vampires' },
      { id: 5, name: 'Cows Go Moo' },
      { id: 6, name: 'Haskell is a language' }
    ];
    
    for (let i = 0; i < topics.length; i++) {
      let newTopic = topics[i];
      DBModel.Topic.create(newTopic);
    }
    
    DBModel.Article.sync({force: true}).then(() => {
      let articles = [
        { id: 1, name: 'Jesus is Real', summary: 'He is really I swore on me mum', topicId: 1 }
      ];

      for (let i = 0; i < articles.length; i++) {
        let newArticle = articles[i];
        DBModel.Article.create(newArticle);
      }
    });
  });  
})();
