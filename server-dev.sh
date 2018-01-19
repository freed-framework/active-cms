#!/bin/bash

echo "start..."
cd /var/web/active-cms

echo "pull..."
git pull origin dev-client

# dev启动
sh ./server.sh dev
