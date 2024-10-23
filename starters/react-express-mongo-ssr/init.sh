#!/bin/bash

# MongoDB SSR Version

PREFIX="[🚀 (LJAS) init.sh]"

echo "${PREFIX} Starting the initialization script..."

# Navigate to script directory just in case working directory is not the same
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR

# Read possible CLI flags
while [ $# -gt 0 ] ; do
    case $1 in
        --install-playwright) INSTALL_PLAYWRIGHT=true ;;
        --skip-build) SKIP_BUILD=true ;;
        --skip-env-file) SKIP_ENV_FILE=true ;;
        --skip-npm-ci) SKIP_NPM_CI=true ;;
        --skip-prisma) SKIP_PRISMA=true ;;
    esac

    shift
done

if [ "$SKIP_ENV_FILE" != "true" ]; then
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
fi

if [ "$SKIP_NPM_CI" != "true" ]; then
    if [ "${NODE_ENV}" == "production" ]; then
        # Always install npm dependencies if the environment is production
        echo "${PREFIX} Installing production npm dependencies..."
        npm ci
        echo "${PREFIX} npm dependency installation completed!"
    elif [ -d "./node_modules" ]; then
        echo "${PREFIX} The node_modules directory already exists, so skip npm dependency installation."
    else
        # Install npm dependencies if node_modules doesn't exist and environment is not production
        echo "${PREFIX} Installing all npm dependencies..."
        npm ci
        echo "${PREFIX} npm dependency installation completed!"
    fi
fi

if [ "$SKIP_PRISMA" != "true" ]; then
    # Setup the database
    echo "${PREFIX} Starting the database updates..."
    npm run prisma db push
    echo "${PREFIX} Database updates completed!"

    echo "${PREFIX} Generating the Prisma client..."
    npm run prisma generate
    echo "${PREFIX} Prisma client generation completed!"
fi

if [ "$SKIP_BUILD" != "true" ]; then
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
fi

if [ "$INSTALL_PLAYWRIGHT" == "true" ]; then
    # Install Playwright browser binaries and dependencies
    echo "${PREFIX} Installing Playwright browser binaries and dependencies..."
    npm run test:e2e:install
    echo "${PREFIX} Playwright browser binary and dependency installation completed!"
fi

echo "${PREFIX} Initialization script completed!"
