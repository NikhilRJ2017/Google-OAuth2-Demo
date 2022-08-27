require('dotenv').config({ path: '../../.env' })
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../../models/User');

const options = {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    scope: ['profile', 'email']
}

const verifyCallback = async (accessToken, refreshToken, profile, done) => {

    try {
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            done(null, user);
        } else {
            // if user not found create a user
            const password = crypto.randomBytes(20).toString('hex');

            const user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password
            });

            return done(null, user)
        }

    } catch (error) {
        console.log("Error in google strategy", error);
    }
}

passport.use(new GoogleStrategy(options, verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((userId, done) => {
    User.findById(userId).then((user) => {
        done(null, user);
    }).catch(err => console.log("Error in deserialize user :", err))
})
module.exports = passport;