#!/bin/bash

# Create container to consume volume "my-volume" using flag -v
# docker run -it -v my-volume:/app ubuntu bash

# Create container to consume volume "my-volume" using flag --mount
docker run -it --mount source=my-volume-2,target=/app ubuntu bash
# If volume doesn't exist, it is created