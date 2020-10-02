const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get("/", ctrl.players.index);

router.get('/signup', ctrl.players.renderSignup);

router.post('/signup', ctrl.players.signup);

router.get('/profile/:index', ctrl.players.renderProfile)

router.put('/profile/:index', ctrl.players.editProfile)

router.get('/login', ctrl.players.renderLogin)

router.post('/login', ctrl.players.checkLogin)

router.delete('/:index', ctrl.players.deletePlayer)

module.exports = router;