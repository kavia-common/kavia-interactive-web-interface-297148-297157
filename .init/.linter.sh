#!/bin/bash
cd /home/kavia/workspace/code-generation/kavia-interactive-web-interface-297148-297157/gai_kavia_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

