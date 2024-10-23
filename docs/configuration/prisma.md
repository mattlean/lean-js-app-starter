# Prisma Configuration

## Overview

All database-based projects will have their Prisma configuration found in the `prisma/` directory. Its contents will vary depending on the database you're working with, but the main file you'll probably work with the most is the [Prisma Schema](https://prisma.io/docs/orm/prisma-schema/overview) named `schema.prisma`.

## `DATABASE_URL` Environment Variable

By default, the Prisma Schema will look for the `DATABASE_URL` environment variable which defines the [connection string](https://pris.ly/d/connection-strings). We recommend assigning this through the `.env` file which you can learn more about in the [`.env` File document](./dotenv-file.md).

## Learning Resources

-   [Set up Prisma ORM: Start from scratch - Relational databases](https://prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)  
    Learn the basics of configuring and using Prisma by setting it up with a relational database from scratch.
-   [Set up Prisma ORM: Start from scratch - MongoDB](https://prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb)  
    Learn the basics of configuring and using Prisma by setting it up with MongoDB from scratch.
