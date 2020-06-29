const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/home_controllers');

router.get('/', homeController.home);

router.get('/sign-in', homeController.signIn);

router.get('/sign-up', homeController.signUp);

router.get('/profile', passport.checkAuthentication, homeController.profile);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'}
), homeController.createSession);

router.post('/create-user', homeController.createUser);

router.get('/sign-out', homeController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'sign-in'}), homeController.createSession);

module.exports = router;