FROM mongo:6.0.6

RUN echo '\nexport PS1="\e[1;36m[🐳 db] \u@\h:\W#\e[0m "' >> /etc/bash.bashrc