#!/usr/bin/env bash

COMMIT_HASH=$(git rev-parse --short HEAD)
zip dist/google-meet-alert-on-exit-chrome-extension-$COMMIT_HASH.zip icons contentscript.js manifest.json
