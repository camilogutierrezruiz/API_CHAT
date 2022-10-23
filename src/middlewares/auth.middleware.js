// Middleware for protect routes
// => 1) token exist?
// => 2) Token belongs to one user
// => 3) Modify req && add req.user with token informartion

// Strategies => Types of methods for auth diferents platforms [Facebook, google, JWT, Github]

// Import dependencies
const JWTStrategy = require('passport-jwt').Strategy; // => Strategies for diferents authentications
const ExtractJwt = require('passport-jwt').ExtractJwt; // => Extract headers from req.body
const { jwtSecret } = require('../config');
const { getUserById } = require('../models_actions/users/users.controller');

// Export anonymous function
module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
  };

  passport.use(
    new JWTStrategy(opts, async (decoded, done) => {
      // done(error, decoded);
      try {
        const response = await getUserById(decoded.id)
        if (!response) {
          return done(null, false);
        };
        console.log('decoded JWT', decoded);
        return done(null, decoded);
      } catch (error) {
        return done(error, false);
      }

    })
  );
};