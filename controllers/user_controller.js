const querystring = require('node:querystring');

const loginPage = (req, res) => { 
    
    res.redirect('/login-success.html')
}

const logout = (req, res) => { 
    req.logout((err) => {
        if (err) console.log("Error in logout", err);

        res.redirect('/')
    })
}

const protectedRouteFunction = (req, res) => { 
    const { name, email } = req.user;
    const query = querystring.stringify({ name, email });
    res.redirect('/protected.html?' + query)
}

module.exports = {
    loginPage,
    logout,
    protectedRouteFunction
}