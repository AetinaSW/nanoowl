#!/bin/bash

PROJECT_NAME=demokit-genai-ui

# 停止並移除 Docker Compose 服務
docker compose --env-file .env down

# 移除相關 Docker 映像
docker images | grep $PROJECT_NAME | awk '{print $3}' | xargs -r docker rmi -f

# 移除 Docker 卷
docker volume ls -q | grep -E $PROJECT_NAME | xargs -r docker volume rm
