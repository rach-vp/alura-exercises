#!/bin/bash

echo "--->  Updating dependencies <---"
apt-get update
echo "--->  Dependencies updated <---"
apt-get install iputils-ping -y
echo "--->  Ping installed <---"
echo "--->  Calling pong <---"
ping pong