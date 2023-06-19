#!/bin/bash

prefix="[🚀 init.sh]"

echo "${prefix} Beginning the initialization script..."

npm run prisma migrate dev

if [ -f "./build/app.js" ]; then
    echo "${prefix} The build already exists, so skip the initial build process."
else
    echo "${prefix} Starting the build process..."
    npm run build
    echo "${prefix} Build process completed!"
fi

echo "${prefix} Starting the development process..."

npm run dev
