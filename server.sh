#!/bin/bash

if [ $# -eq 0 ]; then  
    name='pro'  
else
    name=$1
fi

echo "delete dist"
rm -rf /var/web/active-cms/server/dist
rm -rf /var/web/active-cms/ssr/lib

echo "start..."
cd /var/web/active-cms

echo "pull..."
git pull

echo "stop pm2..."
pm2 stop all

echo "enter server"
cd /server

echo "install..."
cnpm install

echo "build..."
npm run prestart:prod

echo "start server pm2 ..."
pm2 start ./pm2.config.js --env ${name}

echo "leave server ..."
cd ../

echo "enter ssr ..."
cd /ssr

echo "install..."
cnpm install

echo "build..."
npm run build

echo "start ssr pm2 ..."
pm2 start ./pm2.config.js --env ${name}

echo "启动成功"
