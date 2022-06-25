#!/bin/bash

# Create a docker container using bind mount
docker run -it --mount type=bind,source=/home/raquel/alura-exercises/DevOps/Docker/bind-mount-docker,target=/app ubuntu bash