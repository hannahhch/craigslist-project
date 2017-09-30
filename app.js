const express = require('express');
const app = express();
const mustache = require("mustache-express");
const Item = require('./models/item.js');


app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use('/public', express.static('public'));

app.get('/', function(req,res){
  Item.findAll({order: ["price"]}).then(items =>{
    res.render("index", {items:items});

  })
});


app.listen('3000', function(){
  console.log("Listening on port 3000!");
})


module.exports = app;
