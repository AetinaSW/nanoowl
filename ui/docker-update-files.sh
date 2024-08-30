#!/bin/bash

PROJECT_NAME=demokit-genai-ui

cd "$(dirname "$0")"

# Check if the 'images' directory exists
if [ ! -d "./images" ]; then
  echo "The 'images' directory does not exist!"
  exit 1
fi
if [ ! -d "./js" ]; then
  echo "The 'js' directory does not exist!"
  exit 1
fi

docker cp ./images $PROJECT_NAME:/usr/share/nginx/html
echo "./images/ copied to $PROJECT_NAME:/usr/share/nginx/html"
docker cp ./js $PROJECT_NAME:/usr/share/nginx/html
echo "./js/ copied to $PROJECT_NAME:/usr/share/nginx/html"
