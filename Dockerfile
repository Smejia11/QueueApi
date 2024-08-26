# Production environment
FROM node:20.11.0-alpine

RUN mkdir -p /DeployPackage
WORKDIR /DeployPackage
COPY . /DeployPackage
COPY package*.json /DeployPackage/
#RUN npm run production

COPY . .
RUN chmod 777 entrypoint.sh
