# Databases

LJAS supports [PostgreSQL](https://postgresql.org) and [MongoDB](https://mongodb.com) with [Prisma](https://prisma.io).

This document is only relevant to the following Prisma-related starter projects:

| Starter Project Name                  | JavaScript                                                                                                        | TypeScript                                                                                                           |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Express + MongoDB                     | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/express-mongo)              | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/express-mongo-ts)              |
| Express + PostgreSQL                  | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/express-postgres)           | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/express-postgres-ts)           |
| React + Express + MongoDB with SSR    | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-express-mongo-ssr)    | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-express-mongo-ssr-ts)    |
| React + Express + PostgreSQL with SSR | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-express-postgres-ssr) | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-express-postgres-ssr-ts) |

## Contents

-   [Why Prisma?](#why-prisma)
-   [Learning Resources](#learning-resources)
-   [Prisma CLI](#prisma-cli)
-   [Prisma Studio](#prisma-studio)
-   [Connecting to Docker Databases Through a Terminal](#connecting-to-docker-databases-through-a-terminal)
-   [Connecting a Natively Running App with a Containerized Database](#connecting-a-natively-running-app-with-a-containerized-database)
-   [Prisma Configuration](#prisma-configuration)
-   [Examples](#examples)
-   [Frequently Asked Questions](#frequently-asked-questions-faq)

## Why Prisma?

We decided to use Prisma primarily because of the following:

-   [Object-relational mapping (ORM) with support for both PostgreSQL & MongoDB](https://prisma.io/docs/orm/overview/databases)
-   [Generated types for TypeScript derived from models](https://prisma.io/docs/orm/prisma-client/type-safety#what-are-generated-types)
-   [Support for migrations](https://prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/overview)

The Prisma docs go over other good reasons to use their ORM in their [introduction docs](https://prisma.io/docs/orm/overview/introduction/why-prisma).

## Learning Resources

### PostgreSQL

-   [PostgreSQL tutorial](https://postgresql.org/docs/current/tutorial.html)  
    Learn the basic concepts for PostgreSQL and how to execute queries with `psql`.
-   [Prisma's relational databases guide](https://prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)  
    Learn the basics for Prisma with PostgreSQL.

### MongoDB

-   [MongoDB manual introduction](https://mongodb.com/docs/manual/introduction)  
     Learn the basic concepts for MongoDB.
-   [`mongo` shell docs](https://mongodb.com/docs/v4.4/mongo)  
    Learn how to execute queries with the `mongo` shell.
-   [Prisma's MongoDB guide](https://prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb)  
    Learn the basics for Prisma with MongoDB.

## Prisma CLI

The [Prisma command line interface (CLI)](https://prisma.io/docs/orm/tools/prisma-cli) is the primary way of interacting with Prisma. It is used to do various things like make migrations and generate the Prisma Client.

The Prisma CLI can be accessed through the `prisma` `package.json` script:

```console
npm run prisma
```

## Prisma Studio

[Prisma Studio](https://prisma.io/studio) is a tool that lets you explore and manipulate the data in your database through a UI in the browser. It is an alternative to using something like `psql` or `mongo` that works in a terminal.

To start it, run the following `package.json` script:

```console
npm run prisma:studio
```

## Connecting to Docker Databases Through a Terminal

To learn how to connect to Docker databases through a terminal, read the ["Connecting to Docker Databases Through a Terminal" section in the "Docker Environments" document](../docker-environments.md#connecting-to-docker-databases-through-a-terminal).

## Connecting a Natively Running App with a Containerized Database

Some may prefer running their app natively while connecting it to the database running in a container. This creates what we refer to as a hybrid dev environment and can be a great option for those who want to see improved performance for app development but still want all of the conveniences that come with running the database in the Docker dev environment.

To set this up, first remove the `app` service and its dependent volumes in the Docker Compose config file. You can reference [an example that applies these changes to the **Express + PostgreSQL starter's** `docker-compose.yml` file.](./docker-compose.hybrid-example.yml)

After that, all you need to do is modify the `DATABASE_URL` environment variable in the `.env` file to the appropriate connection string so Prisma can connect to the database.

If you're working with unchanged values from the initial setup, then all you need to do is change `db` in the existing connection string to `localhost`.

Using the [**Express + PostgresSQL starter's** `.env` file](../../../starters/express-postgres/.env.example) as an example, you would modify this...

```
DATABASE_URL="postgresql://postgres:password@db:5432/postgres?schema=public"
```

...to this...

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres?schema=public"
```

## Prisma Configuration

Read the [Prisma configuration document](../../configuration/prisma.md) to learn how it is configured and how to customize it yourself.

## Examples

-   [Notes API](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/examples/notes-api): REST API that uses PostgreSQL & Prisma
-   [\*chan](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/examples/starchan): Server-side rendered React app that uses MongoDB & Prisma

## Frequently Asked Questions (FAQ)

### Questions

-   [How do I fix type errors encountered with Prisma?](#how-do-i-fix-type-errors-encountered-with-prisma)
-   [Why do you still use MongoDB 4 and not a newer version?](#why-do-you-still-use-mongodb-4-and-not-a-newer-version)

#### How do I fix type errors encountered with Prisma?

You may encounter a case where TypeScript is throwing type errors with your Prisma-related code when it shouldn't. If this is happening, try running [`prisma generate`](https://prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client) to generate the [Prisma Client](https://prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction).

You can use the `prisma` `package.json` script to do this:

```console
npm run prisma generate
```

Note that if you ever make any changes to the Prisma schema, you must re-run `prisma generate` to update the Prisma Client as well.

#### Why do you still use MongoDB 4 and not a newer version?

At the moment the [official Prisma example uses a MongoDB 4 base image](https://github.com/prisma/prisma/blob/main/docker/mongodb_replica/Dockerfile) so we follow and do the same.
