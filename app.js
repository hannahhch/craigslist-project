const express = require('express');
const fs = require('fs');
const scrapeIt = require("scrape-it");
const app = express();
const mustache = require("mustache-express");

scrapeIt("https://raleigh.craigslist.org/search/apa", {
  items: {
    //this part was tricky - kept returning all titles then price, etc. - not separated
    listItem: ".rows > .result-row",
    data: {
      title: ".result-title"
      //this returned 2 of same price so I had to add result-meta to be more specific
      ,price: ".result-meta .result-price"
      ,itemDate: ".result-date"
    }
  }
}).then(page => {
  console.log(page.items);
});

app.listen('3000', function(){
  console.log("Listening on port 3000!");
})


module.exports = app;
