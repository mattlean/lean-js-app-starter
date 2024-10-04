#!/bin/bash

# Basic Node.js Version

PREFIX="[🚀 (LJAS) init.sh]"

echo "${PREFIX} Beginning the initialization script..."

# Navigate to script directory just in case working directory is not the same
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR

# Read possible CLI flags
while [ $# -gt 0 ] ; do
    case $1 in
        --skip-build) SKIP_BUILD=true ;;
        --skip-npm-install) SKIP_NPM_INSTALL=true ;;
    esac

    shift
done

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

# Make sure a build exists
if [ "$SKIP_BUILD" != "true" ]; then
    if [ "${NODE_ENV}" == "production" ]; then
        echo "${PREFIX} Starting the production build process..."
        npm run build:production
        echo "${PREFIX} Build process completed!"
    elif [[
        (-d "./build/development" && ! -z "$(ls -A ./build/development)")
        && (-f "./build/development/app.js")
    ]]; then
        echo "${PREFIX} The development build already exists, so skip the build process."
    else
        echo "${PREFIX} Starting the development build process..."
        npm run build
        echo "${PREFIX} Build process completed!"
    fi
fi

echo "${PREFIX} Initialization script completed!"
