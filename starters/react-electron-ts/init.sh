#!/bin/bash

# Electron Version

PREFIX="[🚀 (LJAS) init.sh]"

echo "${PREFIX} Beginning the initialization script..."

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
    esac

    shift
done

if [ "$SKIP_ENV_FILE" != "true" ]; then
    # Create .env file if it doesn't already exist
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

if [ "$SKIP_NPM_CI" != "true" ]; then
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
        npm ci
        echo "${PREFIX} Package dependency installation completed!"
    fi
fi

if [ "$SKIP_BUILD" != "true" ]; then
    # Make sure a build exists
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
fi

if [ "$INSTALL_PLAYWRIGHT" == "true" ]; then
    # Install Playwright browser binaries and dependencies
    echo "${PREFIX} Installing Playwright browser binaries and dependencies..."
    npm run test:e2e:install
    echo "${PREFIX} Playwright browser binary and dependency installation completed!"
fi

echo "${PREFIX} Initialization script completed!"
