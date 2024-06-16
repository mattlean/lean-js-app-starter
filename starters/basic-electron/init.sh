#!/bin/bash

# Electron Version

PREFIX="[🚀 init.sh]"

echo "${PREFIX} Beginning the initialization script..."

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

if [ "${NODE_ENV}" == "production" ]; then
    echo "${PREFIX} Starting the production build process..."
    npm run build:production
    echo "${PREFIX} Build process completed!"
elif [[
        (-d "./build/development/preload" && ! -z "$(ls -A ./build/development/preload)")
        && (-d "./build/development/renderer" && ! -z "$(ls -A ./build/development/renderer)")
        && (-d "./build/development/main" && ! -z "$(ls -A ./build/development/main)")
        && (-f "./build/development/main/main.js") && (-f "./build/development/preload/preload.js")
]]; then
    echo "${PREFIX} The development build already exists, so skip the build process."
else
    echo "${PREFIX} Starting the development build process..."
    npm run build
    echo "${PREFIX} Build process completed!"
fi

echo "${PREFIX} Initialization script completed!"
