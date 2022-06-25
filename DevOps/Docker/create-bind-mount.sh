#!/bin/bash

# Create a docker container using bind mount
docker run -it --mount type=bind,source=/home/raquel/alura-exercises/DevOps/Docker/volume-docker,target=/app ubuntu bash