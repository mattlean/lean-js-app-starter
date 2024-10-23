FROM postgres:15.3-bullseye

# Set the Bash prompt to distinguish container shell
RUN echo '\nexport PS1="\e[1;36m[🐳 db] \u@\h:\W#\e[0m "' | tee -a ~/.bashrc /var/lib/postgresql/.bashrc
