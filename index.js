require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./config/db/database');
const passport = require('passport');
const googleOAuth2 = require('./config/auth/passport-google-oauth2');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// ****************************** importing main routes ***************************//
const userRoutes = require('./routes/user_route');
const isLogin = require('./config/middlewares/isLogin');

//******************************* creating session and storing it in mongo store ****************************/
const storeSession = MongoStore.create({
    mongoUrl: process.env.MONGO_DB_URI,
    autoRemove: 'disabled'
});

app.use(session({
    name: 'Google OAuth2 Demo',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: storeSession,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //1 day
    }
}))


// ****************************** initialize passport ****************************//
app.use(passport.initialize());
app.use(passport.session());

//******************************* using statics *************************/
app.use(express.static('./public'))

// ****************************** main routes **************************** //
app.use('/user', userRoutes)

// ****************************** spinning up the server ***************************//
const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB_URI);
        app.listen(PORT, () => {
            console.log(`Server is successfully running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()