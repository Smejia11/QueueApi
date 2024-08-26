export interface DecodedTokenExternal {
  sub: string;
  app: App;
  iat: number;
  exp: number;
}

export interface App {
  name: string;
  services: Service[];
}

export interface Service {
  _id: string;
  name: string;
}
