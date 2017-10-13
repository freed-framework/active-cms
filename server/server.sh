#!/bin/bash

if [ $# -eq 0 ]; then  
    name='pro'  
else if [ $1 -eq 'pro' -o $1 -eq 'dev' -o $1 -eq 'test' ]; then
    name=$1
else
    name='pro'
fi

echo "delete dist"
rm -rf /var/web/active-cms/server/dist

echo "start..."
cd /var/web/active-cms/server

echo "pull..."
git pull

echo "install..."
cnpm install

echo "build..."
npm run prestart:prod

echo "stop pm2..."
pm2 stop all

echo "start pm2 ..."
pm2 start ./pm2.config.js --env ${name}

echo "启动成功"
