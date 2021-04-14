const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  let beersFromAPI = await punkAPI.getBeers();
  res.render('beers', {beersFromAPI});
});

// app.get('/beers', (req, res) => {
//   punkAPI.getBeers()
//   .then(beersFromAPI => {
//   res.render('beers', {beersFromAPI});
//   })
// })

app.get('/random-beer', async  (req, res) => {
  let randomBeer = await punkAPI.getRandom();
  res.render('random-beer', {randomBeer});
}); //as this returns one value as an array - you either need to iterate through it to access it via {{#each}}
    // or let randomBeerArray = await punkAPI.getRandom();
    // let randomBeer = randomBeerArray[0], then render



//iteration 6
app.get('/beers/:id', async  (req, res) => {
  let beers = await punkAPI.getBeer(req.params.id);
  let individualBeer = beers[0];
  res.render('partials/beerpartial', individualBeer);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
