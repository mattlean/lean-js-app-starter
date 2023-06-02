FROM node:18.16.0-bullseye

WORKDIR /code

COPY package.json .

RUN npm i

CMD ["npm", "run", "dev"]