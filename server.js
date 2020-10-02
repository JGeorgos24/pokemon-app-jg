const express = require('express');
const methodOverride = require('method-override');

const pokemon = require('./models/pokemon');
const routes = require('./routes');

const app = express();

// middleware
app.use(express.urlencoded({extended: true})); 
app.use(methodOverride('_method'));

app.use(express.static("public"));

app.use('/pokemon', routes.pokemon);
app.use('/players', routes.players);

// Make app on port 3001
app.listen(3001, () => {
    console.log('I am listening on port 3001.');
})




// End of DAY 2
// ****** OLD VERSION OF CODE PRE MVC ************ 

// GET
// app.get('/pokemon', (req, res) => {
//       res.render('index.ejs', {
//         pokemon: pokemon
//       });
// })

// app.get('/pokemon/new', (req, res) => {
//   res.render('new.ejs')
// })

// app.get('/pokemon/:index', (req, res) => {
//     // res.send(pokemon[req.params.index]); DAY 1
//     res.render('show.ejs', {
//       pokemon: pokemon[req.params.index]
//     }); 
// })

// app.get('/pokemon/:index/edit', (req, res) => {
//   res.render('edit.ejs', {
//     pokemon: pokemon[req.params.index],
//     index: req.params.index
//   }); 
// })

// POST
// app.post('/pokemon', (req, res) => {
//   pokemon.push(req.body)
//   res.redirect('/pokemon');
// })

// PUT
// app.put('/pokemon/:index', (req, res) => {
//   pokemon[req.params.index] = req.body;
//   res.redirect(`/pokemon/${req.params.index}`)
// })

// DELETE
// app.delete('/pokemon/:index', (req, res) => {
//   pokemon.splice(req.params.index, 1);
//   res.redirect('/pokemon');
// })