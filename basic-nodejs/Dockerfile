# docker build -t my-node-app .
# docker run --detach --publish 3000:3000 my-node-app

# FROM node:12-stretch
FROM node:18.16.0-bullseye

WORKDIR /code

COPY package.json .

RUN npm i

CMD ["npm", "run", "dev"]