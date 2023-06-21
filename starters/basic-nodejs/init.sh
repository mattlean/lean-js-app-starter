#!/bin/bash

prefix="[🚀 init.sh]"

echo "${prefix} Beginning the initialization script..."

if [ -d "./node_modules" ]
then
    echo "${prefix} The node_modules directory already exists, so skip package dependency installation." 
else
    echo "${prefix} Installing package dependencies..."
    npm install
    echo "${prefix} Package dependency installation completed!"
fi

if [ -f "./build/app.js" ]
then
    echo "${prefix} The build already exists, so skip the initial build process."
else
    echo "${prefix} Starting the build process..."
    npm run build
    echo "${prefix} Build process completed!"
fi

echo "${prefix} Initialization script completed!"
