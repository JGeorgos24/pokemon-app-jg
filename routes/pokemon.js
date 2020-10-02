const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.pokemon.index);

router.get('/new', ctrl.pokemon.newPokemon);

router.get('/:index', ctrl.pokemon.showPokemon);

router.get('/:index/edit', ctrl.pokemon.editPokemon);

router.post('/', ctrl.pokemon.createPokemon);

router.put('/:index', ctrl.pokemon.updatePokemon);

router.delete('/:index', ctrl.pokemon.deletePokemon);


module.exports = router;