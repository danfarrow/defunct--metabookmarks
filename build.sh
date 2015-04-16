#!/bin/bash

# Development build script for metabookmarks Firefox add-on

# Clean build directory
rm -rf ./build;
mkdir build;

# Build xpi from source
pushd source;
cfx xpi --output-file=../build/metabookmarks.xpi;
popd;

# Copy manifest & content to xpi
zip -r build/metabookmarks.xpi source/chrome.manifest;
zip -r build/metabookmarks.xpi source/content;

# Push xpi to Firefox
wget --post-file=build/metabookmarks.xpi http://localhost:8888/;
