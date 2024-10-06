FROM node:18.17.1-bullseye

# Set the Bash prompt to distinguish container shell
RUN echo '\nexport PS1="\e[1;36m[🐳 app] \u@\h:\W#\e[0m "' >> ~/.bashrc

WORKDIR /code

# Copy package.json & yarn.lock so npm dependencies can be installed during the image build process
COPY package.json yarn.lock .
RUN yarn

CMD ["yarn", "dev"]
