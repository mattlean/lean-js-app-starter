FROM node:18.16.0-bullseye

RUN echo '\nexport PS1="\e[1;36m[🐳 app] \u@\h:\W#\e[0m "' >> ~/.bashrc

WORKDIR /code

COPY package.json .

RUN npm install

CMD ["bash", "init.sh"]