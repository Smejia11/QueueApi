import passport from 'passport';
import jwtStrategy from './strategies/jwt.strategy';
import jwtExternal from './strategies/jwt.external.strategy';

export const TYPES = {
  JWT: 'jwt',
  JWT_EXTERNAL: 'jwtExternal',
};

passport.use(TYPES.JWT, jwtStrategy);
passport.use(TYPES.JWT_EXTERNAL, jwtExternal);
