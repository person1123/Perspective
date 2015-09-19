(function() {
  'use strict';

  // Dependencies
  let Sequelize = require('sequelize');

  let pg_ip = process.env.HACKDB_PORT_5432_TCP_ADDR;
  let sequelize = new Sequelize('postgres://' + pg_ip + ':5432/hackmit');
  
  let trend = sequelize.define('Trend', {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      
    }
  });
})();
