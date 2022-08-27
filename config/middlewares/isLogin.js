const isLogin = (req, res, next) =>{
    if (req.isAuthenticated()) {
        res.redirect('/login-success.html')
    } else {
        next();
    }
}

module.exports = isLogin;