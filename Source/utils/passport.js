const modelUsers = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

let FacebookStrategy = require('passport-facebook');

passport.use(new LocalStrategy(   
	async function(username, password, done) {
		const user = await modelUsers.singleByUserName(username)
        
		if (!user) { return done(null, false); }
		
		const rs = bcryptjs.compareSync(password, user.Password);

		if (!rs) { return done(null, false); }

		delete user.Password;
		
        return done(null, user);
	}
));

const FACEBOOK_APP_ID = '966523157123607';
const FACEBOOK_APP_SECRET = 'd26957293c57c569aebf8a3d9a454345';

const fbOpts = {
	clientID: FACEBOOK_APP_ID,
	clientSecret: FACEBOOK_APP_SECRET,
	callbackURL: "http://localhost:3000/facebook/callback",

};

let fbCallback = async function(accessToken, refreshToken, profile, cb){
	let user = await modelUsers.singleByIDFacebook(profile.id)
        
	if (!user) { 

		const entity = {
			FullName: profile.displayName,
			UserName: profile.displayName,
			idFacebook: profile.id,
			Password: Math.floor(Math.random() *1000000),
			TypeOfUser: 1,
			Status: 1,
		}

		const rows = await modelUsers.addFacebookUser(entity);

		if(rows.affectedRow < 1)
			return cb(null, false);

		user = await modelUsers.singleByIDFacebook(profile.id)

	}

	delete user.Password;
	
	return cb(null, user);
};

passport.use(new FacebookStrategy(fbOpts, fbCallback));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(async function(user, done) {
	done(null, user);
});

module.exports = passport;