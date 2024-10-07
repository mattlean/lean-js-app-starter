#!/bin/bash

echo "😬 Starting release-zip.sh..."
cd starters

for subdir in */
do
    echo "Prefixing: ${subdir}"
    mv "$subdir" "ljas-${subdir}"
done

for subdir in */
do
    echo "Zipping: ${subdir}"
    zip -r ${subdir%/}.zip ${subdir}
done

echo "🤐 Job's done!"
