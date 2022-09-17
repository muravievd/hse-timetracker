#!/bin/sh

echo "Building Docker Image"
sudo docker build . -t hse-timetracker
echo "Removing old Docker Container"
sudo docker rm hse-timetracker --force
echo "Launching new Docker Container"
sudo docker run -d -p 3000:3000 --name hse-timetracker hse-timetracker
echo "Restart >> Always"
sudo docker update --restart always hse-timetracker