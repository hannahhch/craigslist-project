const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite://test.db');


const Item = sequelize.define('item', {
  title: Sequelize.STRING,
  price: Sequelize.STRING,
  date: Sequelize.STRING,
});

module.exports = Item;
