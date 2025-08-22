FROM node:22-alpine AS install-dependencies-build

WORKDIR /app

COPY . .

RUN npm ci
#=======================================================================================
FROM node:22-alpine AS install-dependencies-prod

WORKDIR /app

COPY --from=install-dependencies-build /app/package.json ./package.json
COPY --from=install-dependencies-build /app/package-lock.json ./package-lock.json

RUN npm ci --omit=dev


#=======================================================================================
FROM node:22-alpine AS build

WORKDIR /app

COPY --from=install-dependencies-build /app/node_modules/ ./node_modules
COPY . .

RUN npm run build
#=======================================================================================
FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=build /app/DeployPackage/ ./DeployPackage
COPY --from=install-dependencies-prod /app/node_modules/ ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json

EXPOSE 9089

CMD [ "node","--run","start" ]
