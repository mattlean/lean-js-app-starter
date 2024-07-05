#!/bin/bash

# Browser Version

PREFIX="[🚀 (LJAS) init.sh]"

echo "${PREFIX} Starting the initialization script..."

# Navigate to script directory just in case working directory is not the same
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR

# Read possible CLI flags
while [ $# -gt 0 ] ; do
    case $1 in
        --skip-env-file) SKIP_ENV_FILE=true ;;
        --skip-npm-install) SKIP_NPM_INSTALL=true ;;
        --skip-playwright) SKIP_PLAYWRIGHT=true ;;
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

if [ "$SKIP_NPM_INSTALL" != "true" ]; then
    if [ -d "./node_modules" ]; then
        echo "${PREFIX} The node_modules directory already exists, so skip package dependency installation."
    else
        # Install npm dependencies if node_modules doesn't exist and environment is not production
        echo "${PREFIX} Installing all package dependencies..."
        npm install
        echo "${PREFIX} Package dependency installation completed!"
    fi
fi

if [ "$SKIP_PLAYWRIGHT" != "true" ]; then
    # Install Playwright browser binaries and dependencies
    echo "${PREFIX} Installing Playwright browser binaries and dependencies..."
    npm run test:e2e:install
    echo "${PREFIX} Playwright browser binary and dependency installation completed!"
fi

echo "${PREFIX} Initialization script completed!"
