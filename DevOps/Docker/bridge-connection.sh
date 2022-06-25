#!/bin/bash

# Create bridge network
docker network create --driver bridge my-bridge

# Create containers with custom names
# To keep containers running it was used `sleep 1d` instead of `bash`
docker run -d --name pong --network my-bridge ubuntu sleep 1d
docker run -it --name ubuntu1 --network my-bridge --mount type=bind,source=/home/raquel/alura-exercises/DevOps/Docker/bind-mount-docker,target=/app ubuntu app/pong.sh