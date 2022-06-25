#!/bin/bash

docker network create new-bridge
docker run -d --network new-bridge --name meu-mongo mongo:4.4.6
docker run -d --network new-bridge --name alura-books -p 3000:3000 aluradocker/alura-books:1.0