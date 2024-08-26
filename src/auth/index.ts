import passport from 'passport';
import jwtStrategy from './strategies/jwt.strategy';
import jwtExternal from './strategies/jwt.external.strategy';

passport.use('jwtICNN', jwtStrategy);
passport.use('jwtExternal', jwtExternal);
