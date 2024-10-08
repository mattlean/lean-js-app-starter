#!/bin/bash

echo "🔓 Starting update-lock.sh..."

echo "Updating package-lock.json for root"
npm i

cd examples
for subdir in */
do
    cd "$subdir"
    if [ "$subdir" = "todo-list/" ]; then
        echo "Updating yarn.lock for: todo-list/"
        yarn
    else
        echo "Updating package-lock.json for: ${subdir}"
        npm i --package-lock-only --workspaces false
    fi
    cd ../
done

cd ../starters

for subdir in */
do
    echo "Updating package-lock.json for: ${subdir}"
    cd "$subdir"
    npm i --package-lock-only --workspaces false
    cd ../
done

echo "🔒 Job's done!"
