const Sequelize = require('sequelize');
const sequelize = require('../connection.js');


const Item = sequelize.define('item', {
  title: Sequelize.STRING,
  price: Sequelize.INTEGER,
  date: Sequelize.STRING,
});

module.exports = Item;
