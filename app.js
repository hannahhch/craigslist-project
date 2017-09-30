const express = require('express');
const app = express();
const mustache = require("mustache-express");

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use('/public', express.static('public'));

app.get('/', function(req,res){
  res.render('index');
});


app.listen('3000', function(){
  console.log("Listening on port 3000!");
})


module.exports = app;
