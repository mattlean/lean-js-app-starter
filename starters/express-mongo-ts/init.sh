#!/bin/bash

# MongoDB Version

PREFIX="[🚀 init.sh]"

echo "${PREFIX} Beginning the initialization script..."

if [ -d "./node_modules" ]; then
    echo "${PREFIX} The node_modules directory already exists, so skip package dependency installation." 
else
    echo "${PREFIX} Installing package dependencies..."
    npm install
    echo "${PREFIX} Package dependency installation completed!"
fi

echo "${PREFIX} Starting the database updates..."
npm run prisma db push
echo "${PREFIX} Database updates completed!"

echo "${PREFIX} Generate the Prisma client..."
npm run prisma generate
echo "${PREFIX} Prisma client generation completed!"

if [ "${NODE_ENV}" == "production" ]; then
    echo "${PREFIX} Starting the production build process..."
    npm run build:production
    echo "${PREFIX} Build process completed!"
else
    if [ -f "./build/backend/server.js" ]; then
        echo "${PREFIX} The development build already exists, so skip the initial build process."
    else
        echo "${PREFIX} Starting the development build process..."
        npm run build
        echo "${PREFIX} Build process completed!"
    fi
fi

echo "${PREFIX} Initialization script completed!"
