FROM node:20.9.0-bullseye-slim

# Set the Bash prompt to distinguish container shell
RUN echo '\nexport PS1="\e[1;36m[🐳 app] \u@\h:\W#\e[0m "' >> ~/.bashrc

WORKDIR /code

# Copy package.json & package-lock.json so npm dependencies can be installed during the image build process
COPY package.json package-lock.json .
RUN npm ci

CMD bash init.sh && npm run dev
