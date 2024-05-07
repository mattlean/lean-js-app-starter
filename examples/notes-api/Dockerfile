FROM node:18.16.0-bullseye

# Set the Bash prompt to distinguish container shell
RUN echo '\nexport PS1="\e[1;36m[🐳 app] \u@\h:\W#\e[0m "' >> ~/.bashrc

WORKDIR /code

# Copy package.json so npm dependencies can be installed in the build process
COPY package.json .
RUN npm install

CMD bash init.sh && npm run dev
