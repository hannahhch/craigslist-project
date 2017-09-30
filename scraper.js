const scrapeIt = require("scrape-it");
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite://test.db');
const Item = require('./models/item.js');


let urls = [
  "https://raleigh.craigslist.org/search/apa",
  "https://raleigh.craigslist.org/search/apa?s=120",
  "https://raleigh.craigslist.org/search/apa?s=240",
  "https://raleigh.craigslist.org/search/apa?s=360",
  "https://raleigh.craigslist.org/search/apa?s=480",
  "https://raleigh.craigslist.org/search/apa?s=600",
  "https://raleigh.craigslist.org/search/apa?s=720",
  "https://raleigh.craigslist.org/search/apa?s=840",
  "https://raleigh.craigslist.org/search/apa?s=960"
];

for (let i = 0; i < urls.length; i ++){
  scrapeIt(urls[i], {
    items: {
      //this part was tricky - kept returning all titles then price, etc. - not separated
      listItem: ".rows > .result-row",
      data: {
        title: ".result-title"
        //this returned 2 of same price so I had to add result-meta to be more specific
        ,price: ".result-meta .result-price"
        ,date: ".result-date"
      }
    }
  })
    .then(page => {
    const items = page.items;

    sequelize.sync()
    .then(() => Promise.all(
      items.map(item => Item.create(item))
    ))
  });
}
