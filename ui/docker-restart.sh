#!/bin/bash

cd "$(dirname "$0")"
docker load -i ./aetinasw-demokit-genai-ui-*.tar.gz
docker compose --env-file .env restart
