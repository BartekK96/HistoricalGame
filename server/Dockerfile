FROM node:18

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "testing"]; \
    then npm install; \
    else npm install --omit=dev; \
    fi

COPY . .

RUN npm run build

CMD [ "npm", "run", "prod" ]