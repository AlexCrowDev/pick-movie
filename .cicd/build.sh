#!/bin/sh
set -eu

echo Building

npm install
npm run build

echo Done