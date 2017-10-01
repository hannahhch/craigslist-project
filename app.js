const express = require('express');
const app = express();
const mustache = require("mustache-express");
const Item = require('./models/item.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use('/public', express.static('public'));

app.get('/', function(req,res){
  let one = Item.findAll({
    where: {
      price:{
        //a range
        [Op.between]: [1,200]
      }
    },
    //orders from smallest to largest number
    order: ["price"]
  })
  let two = Item.findAll({
    where: {
      price:{
        [Op.between]: [201,400]
      }
    },
    order: ["price"]
  })
  let three = Item.findAll({
    where: {
      price: {
        [Op.between]: [401, 600]
      }
    },
    order: ["price"]
  })
  let four = Item.findAll({
    where: {
      price: {
        [Op.between]: [601, 800]
      }
    },
    order: ["price"]
  })
  let five = Item.findAll({
    where: {
      price: {
        [Op.between]: [801, 1000]
      }
    },
    order: ["price"]
  })

//chain together promises so that they can all render to same page 
  Promise.all([one,two, three, four, five]).then(items =>{
    res.render("index", {
      one:items[0],
      two:items[1],
      three:items[2],
      four:items[3],
      five:items[4]
    });
  })
});


app.listen('3000', function(){
  console.log("Listening on port 3000!");
})


module.exports = app;
