#!/bin/bash

# PostgreSQL SSR Version

PREFIX="[🚀 init.sh]"

echo "${PREFIX} Starting the initialization script..."

# Navigate to script directory just in case working directory is not the same
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR

# Read possible CLI flags
while [ $# -gt 0 ] ; do
    case $1 in
        --skip-npm-install) SKIP_NPM_INSTALL=true ;;
        --skip-prisma) SKIP_PRISMA=true ;;
    esac

    shift
done

if [ "${NODE_ENV}" != "production" ]; then
    # Create .env file if it doesn't exist and if the environment is not production
    if [ -f ".env.example" ]; then
        if [ ! -f ".env" ]; then
            cp .env.example .env
            echo "${PREFIX} New .env file was created."
        else
            echo "${PREFIX} Existing .env file was found, so skip the .env creation process."
        fi
    elif [ ! -f ".env" ]; then
        echo ".env file could not be created because .env.example was not found."
    fi
fi

if [ "$SKIP_NPM_INSTALL" != "true" ]; then
    if [ "${NODE_ENV}" == "production" ]; then
        # Always install dependencies if the environment is production
        echo "${PREFIX} Installing production package dependencies..."
        npm ci
        echo "${PREFIX} Package dependency installation completed!"
    elif [ -d "./node_modules" ]; then
        echo "${PREFIX} The node_modules directory already exists, so skip package dependency installation."
    else
        # Install npm dependencies if node_modules doesn't exist and environment is not production
        echo "${PREFIX} Installing all package dependencies..."
        npm install
        echo "${PREFIX} Package dependency installation completed!"
    fi
fi

if [ "$SKIP_PRISMA" != "true" ]; then
    # Setup the database
    echo "${PREFIX} Starting the database migrations..."
    npm run prisma migrate dev
    echo "${PREFIX} Database migrations completed!"

    echo "${PREFIX} Generating the Prisma client..."
    npm run prisma generate
    echo "${PREFIX} Prisma client generation completed!"
fi

# Make sure a build exists
if [ "${NODE_ENV}" == "production" ]; then
    echo "${PREFIX} Starting the production build process..."
    npm run build:production
    echo "${PREFIX} Build process completed!"
elif [[
    (-d "./build/development/backend" && ! -z "$(ls -A ./build/development/backend)")
    && (-f "./build/development/backend/server.js")
]]; then
    echo "${PREFIX} The development build already exists, so skip the build process."
else
    echo "${PREFIX} Starting the development build process..."
    npm run build
    echo "${PREFIX} Build process completed!"
fi

echo "${PREFIX} Initialization script completed!"
