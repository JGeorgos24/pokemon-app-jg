// const pokemon = require('../models/pokemon');

const Pokemon = require('../models').Pokemon;
const Team = require('../models').Team;
const Player = require('../models').Player;

const index = (req, res) => {
    Pokemon.findAll({
        order: [
            ['name', 'ASC'],
            ['id', 'ASC']
        ]
    })
    .then(pokemon1 => {
        res.render('index.ejs', {
            pokemon: pokemon1  
        })
    })
}

const newPokemon = (req, res) => {
    res.render('new.ejs')
}

const showPokemon = (req, res) => {
    Pokemon.findByPk(req.params.index, {
        include: [
            {
            model: Player,
            attributes: ['name']
            }
        ],
        attributes: ['name', 'img']        
    })
    .then(foundPokemon => {
        res.render('show.ejs', {
        pokemon: foundPokemon
        });
    }) 
}

const editPokemon = (req, res) => {
    Pokemon.findByPk(req.params.index)
        .then(foundPokemon => {
            res.render('edit.ejs', {
                pokemon: foundPokemon,
            })           
        })
}

const updatePokemon = (req, res) => {
    Pokemon.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(updatePokemon => {
                res.redirect(`/pokemon/${req.params.index}`);
            })
}

const createPokemon = (req, res) => {
    Pokemon.create(req.body)
    .then(newPokemon => {
        res.redirect('/pokemon');
    })
}

const deletePokemon = (req, res) => {
    Pokemon.destroy({
        where: {id: req.params.index}
    })
    .then(() => {
        res.redirect('/pokemon');   
    })
}


module.exports = {
    index,
    newPokemon,
    showPokemon,
    editPokemon,
    createPokemon,
    updatePokemon,
    deletePokemon,
}