'use strict';

let Sequelize = require('sequelize');
let pg_ip = process.env.HACKDB_PORT_5432_TCP_ADDR;
let sequelize = new Sequelize('postgres://postgres@' + pg_ip + ':5432/hackmit');

class DBModel {
  constructor(Topic, Article) {
    this.Topic = Topic;
    this.Article = Article;
  }
}

let Topic = sequelize.define('topic', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

let Article = sequelize.define('article', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});
Topic.hasMany(Article);

module.exports = new DBModel(Topic, Article);

