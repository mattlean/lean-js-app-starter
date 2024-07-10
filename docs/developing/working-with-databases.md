# Working with Databases

## Why use Prisma?

TODO:
https://www.prisma.io/docs/concepts/overview/why-prisma

## Updating Docker setup to only run database

TODO:

## Connecting to the database in Docker

TODO:

```
docker exec -it ljas-express-postgres-db -u postgres psql
```

```
docker exec -it ljas-express-mongo-db mongo -u mongo
```

## Prisma type error fix

You may encounter a case where TypeScript is throwing type errors with your Prisma-related code. If this is happening, first make sure that your application can even connect to the database. If it can, then try running `prisma generate` to generate the Prisma client.

Usually this is automatically run when the `@prisma/client` package is installed, but there are some cases where it could be missed.

## Why do you still use MongoDB 4 and not a newer version?

At the moment the [official Prisma example uses a MongoDB 4 base image](https://github.com/prisma/prisma/blob/main/docker/mongodb_replica/Dockerfile) so we follow and do the same.
