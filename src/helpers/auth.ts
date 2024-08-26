import jwt from 'jsonwebtoken';
import config from '../config';
import { DecodedToken, DecodedTokenExternal } from '../interfaces';

const {
  tokens: {
    jwt: { jwtSecret: JWT_SECRET },
    jwtExternal: { jwtSecret: JWT_SECRET_SERVICES },
  },
} = config;

const decodeAuth = (token: string = ''): DecodedToken | null => {
  const onlyToken = token.replace('Bearer ', '');
  const decoded = jwt.verify(onlyToken, JWT_SECRET) as DecodedToken;
  return decoded;
};

const decodeAuthExternal = (
  token: string = ''
): DecodedTokenExternal | null => {
  const onlyToken = token.replace('Bearer ', '');
  const decoded = jwt.verify(
    onlyToken,
    JWT_SECRET_SERVICES
  ) as DecodedTokenExternal;
  return decoded;
};

export { decodeAuth, decodeAuthExternal };
