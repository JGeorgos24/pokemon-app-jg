// const players = require('../players');

const Player = require('../models').Player;
const Team = require('../models').Team;
const Pokemon = require('../models').Pokemon;

const index = (req, res) => {
    res.render('players/index.ejs');
}

const renderSignup = (req, res) => {
    res.render('players/signup.ejs')
}

const signup = (req, res) => {
    Player.create(req.body)
    .then(newPlayer => {
        res.redirect(`/players/profile/${newPlayer.id}`);
    }) 
}


const renderProfile = (req, res) => {
    Player.findByPk(req.params.index, {
        include: [
            {
                model: Team
            },
            {
                model: Pokemon 
            }
        ]
    })
    .then(playerProfile => {
        Team.findAll()
        .then(teams => {
            Pokemon.findAll()
            .then(allPokemon => {
            res.render('players/profile.ejs', {
                player: playerProfile,
                teams: teams,
                pokemons: allPokemon
            })
            })   
        })
    }) 
}

const editProfile = (req, res) => {
    Player.update(req.body, {
        where: {id:req.params.index},
        returning: true
        
    })
    .then(updatePlayer => {
        console.log(req.body)
        Pokemon.findByPk(req.body.pokemonId)
        .then(foundPokemon => {
            Player.findByPk(req.params.index)
            .then(foundPlayer => {
                foundPlayer.addPokemon(foundPokemon);
                res.redirect(`/players/profile/${req.params.index}`);
            })
        })  
    })
}

const renderLogin = (req, res) => {
    res.render('players/login.ejs')
}

const checkLogin = (req, res) => {
    Player.findOne({
        where: {
            username: req.body.username,
            password: req.body.password       
        }
    })
    .then(foundPlayer => {
        res.redirect(`/players/profile/${foundPlayer.id}`);
    }) 
}

const deletePlayer = (req, res) => {
    Player.destroy({
        where: {
            id: req.params.index
        }
    })
    .then(() => {
        res.redirect('/players');  
    })
}

module.exports = {
    index,
    renderSignup,
    signup,
    renderProfile,
    editProfile,
    renderLogin,
    checkLogin,
    deletePlayer
}