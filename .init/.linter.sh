#!/bin/bash
cd /home/kavia/workspace/code-generation/creative-asset-manager-522-531/creative_assets_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

