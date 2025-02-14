const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static("public"));


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {
        beers: beers
      });
    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/random-beers', (req, res, next) => {

  punkAPI.getRandom()
    .then(beers => {
      res.render('random-beers', {
        beer: beers[0]
      });
    })
    .catch(error => {
      console.log(error)
    })


});

app.get('/random-beers/:id', (req, res, next) => {

  console.log('this is the id', req.params.id);

  punkAPI.getBeer(req.params.id)
    .then(beers => {
      console.log(beers[0]);
      res.render('random-beers', {
        beer: beers[0]
      });
    })
    .catch(error => {
      console.log(error);
    })
});

app.listen(3000);

//GETTING AN ID FROM THE URL AND DISPLAY A BEER