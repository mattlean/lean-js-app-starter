#!/bin/bash

echo "😬 Starting release-zip.sh..."
cd starters

for subdir in */
do
    echo "Temp prefixing: ${subdir}"
    mv "$subdir" "ljas-${subdir}"
done

for subdir in */
do
    echo "Zipping: ${subdir}"
    zip -r ${subdir%/}_1-0-0.zip ${subdir}
done

for subdir in */
do
    echo "Removing prefixes: ${subdir}"
    mv "$subdir" "${subdir#ljas-}"
done

echo "🤐 Job's done!"
