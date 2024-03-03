#!/bin/bash

# PostgreSQL Version

PREFIX="[🚀 init.sh]"

echo "${PREFIX} Starting the initialization script..."

if [ "${NODE_ENV}" == "production" ]; then
    echo "${PREFIX} Installing production package dependencies..."
    npm ci
    echo "${PREFIX} Package dependency installation completed!"
elif [ -d "./node_modules" ]; then
    echo "${PREFIX} The node_modules directory already exists, so skip package dependency installation." 
else
    echo "${PREFIX} Installing all package dependencies..."
    npm install
    echo "${PREFIX} Package dependency installation completed!"
fi

echo "${PREFIX} Starting the database migrations..."
npm run prisma migrate dev
echo "${PREFIX} Database migrations completed!"

echo "${PREFIX} Generating the Prisma client..."
npm run prisma generate
echo "${PREFIX} Prisma client generation completed!"

if [ "${NODE_ENV}" == "production" ]; then
    echo "${PREFIX} Starting the production build process..."
    npm run build:production
    echo "${PREFIX} Build process completed!"
elif [[
    (-d "./build" && ! -z "$(ls -A ./build)")
    && (-f "./build/server.js")
]]; then
    echo "${PREFIX} The development build already exists, so skip the build process."
else
    echo "${PREFIX} Starting the development build process..."
    npm run build
    echo "${PREFIX} Build process completed!"
fi

echo "${PREFIX} Initialization script completed!"
