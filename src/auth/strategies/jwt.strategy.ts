import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../config';

const {
  tokens: {
    jwt: { jwtSecret },
  },
} = config;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const jwtStrategy = new Strategy(options, (payload, done) =>
  done(null, payload)
);

export default jwtStrategy;
