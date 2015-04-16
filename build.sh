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
pushd source;
zip -r ../build/metabookmarks.xpi ./chrome.manifest;
zip -r ../build/metabookmarks.xpi ./content;
popd;

# Push xpi to Firefox
wget --post-file=./build/metabookmarks.xpi http://localhost:8888/;
