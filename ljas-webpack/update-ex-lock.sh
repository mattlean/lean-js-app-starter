#!/bin/bash

echo "🔓 Starting update-ex-lock.sh..."

cd examples
for subdir in */
do
    cd "$subdir"
    npm i --package-lock-only --workspaces false
    cd ../
done

echo "🔒 Job's done!"
