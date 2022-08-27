const express = require('express');
const passport = require('passport');
const { loginPage, logout, protectedRouteFunction } = require('../controllers/user_controller');
const isAuth = require('../config/middlewares/isAuth');
const isLogin = require('../config/middlewares/isLogin');
const router = express.Router();

router.get('/auth/google', isLogin, passport.authenticate('google'));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login-failure.html' }), loginPage);
router.get('/protected', isAuth, protectedRouteFunction)
router.get('/logout', logout);


module.exports = router