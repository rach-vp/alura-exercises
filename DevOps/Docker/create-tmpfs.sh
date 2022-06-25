#!/bin/bash

# Create container with a tmpfs persistance
docker run -it --tmpfs=/app ubuntu bash