FROM node:18.16.0-bullseye

WORKDIR /code

COPY package.json .

RUN npm install --ignore-scripts

CMD ["npm", "run", "dev"]