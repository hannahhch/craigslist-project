const scrapeIt = require("scrape-it");
const sequelize = require('./connection.js');
const Item = require('./models/item.js');

//each url is a different page so that I could get 1,000 items. I actually got 1080, so
//next time I would look into limiting this.
const urls = [
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
        title: ".result-title",
        //this returned 2 of same price so I had to add result-meta to be more specific
        price: ".result-meta .result-price",
        date: ".result-date"
      }
    }
  })
  .then(page => {
    const items = page.items;
    sequelize.sync()
    .then(() => Promise.all(
      items.map(item => {
        //I sliced off the dollar sign so that I could sort by integer
        item.price = item.price.slice(1);
        return Item.create(item)
      })
    ))
  });
}
