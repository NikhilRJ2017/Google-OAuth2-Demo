const isAuth = (req, res, next) => { 
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login-failure.html')
    }
}

module.exports = isAuth;