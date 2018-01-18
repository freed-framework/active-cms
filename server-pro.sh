#!/bin/bash

echo "start..."
cd /var/web/active-cms

echo "pull..."
git pull


# pro启动
sh ./server.sh pro
