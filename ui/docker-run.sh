#!/bin/bash

PROJECT_NAME=demokit-genai-ui

# 設定工作目錄
cd "$(dirname "$0")"

# 加載 Docker 映像
docker load -i ./aetinasw-$PROJECT_NAME-*.tar.gz

# 創建 Docker 卷
docker compose -f $PROJECT_NAME.volumes.yml up
docker compose -f $PROJECT_NAME.volumes.yml down

# 確認 .env 文件存在並加載變數
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found!"
  exit 1
fi

# 運行 Docker Compose
docker compose --env-file .env up -d
