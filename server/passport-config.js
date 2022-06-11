const { authenticate } = require('passport')

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail) {
	const authenticateUser = async (email, contrasena, done) => {
		const user = getUserByEmail(email)
		if(user == null){
			return done(null, false, { message: 'Correo o contraseña son inválidos' })
		}

		try {
			if(await bcrypt.compare(contrasena, user.contrasena)) {
				return done(null, user)
			} else {
				return done(null, false, { message: 'Correo o contraseña son inválidos' })
			}
		} catch (e) {
			return done(e)
		}
	}
	passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'contrasena'}, authenticateUser))
	passport.serializeUser(function(user, done) {
		done(null, user);
		});	
		
	passport.deserializeUser(function(user, done) {
	done(null, user);
	});

}

module.exports = initialize
