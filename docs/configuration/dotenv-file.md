# `.env` File

Instead of manually assigning environment variables through terminal commands, LJAS supports the definition of environment variables through a `.env` file using the [`dotenv` package](https://github.com/motdotla/dotenv).

The `.env` file does not exist by default, so you will need to create a new one when starting a new LJAS project. There are a few ways to do so which is gone over in the "Getting Started" section of your project's `README.md`, but a simple way to create one is to just copy the `.env.example` file and paste it as `.env` in the project's root directory.

Note that the `.env` file should never be committed to version control or shared as it could potentially contain private secrets. It is ignored by default in the `.gitignore` file in the project's root directory.

For more information on configuring and working with the `.env` file, please read the [`dotenv`'s `README.md`](https://github.com/motdotla/dotenv).
