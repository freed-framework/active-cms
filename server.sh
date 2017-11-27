#!/bin/bash

if [ $# -eq 0 ]; then  
    name='pro'  
else
    name=$1
fi

echo "delete dist"
rm -rf /var/web/active-cms/server/dist
rm -rf /var/web/active-cms/ssr/lib
rm -rf /var/web/active-cms/client/dist

echo "start..."
cd /var/web/active-cms

echo "pull..."
git pull

echo "enter client ..."
cd /var/web/active-cms/client

echo "install client"
cnpm install

echo "build"
npm run build
npm run build-ssr

echo "stop pm2..."
pm2 delete all

echo "enter server"
cd /var/web/active-cms/server

echo "install..."
cnpm install

echo "build server..."
npm run prestart:prod

echo "start server pm2 ..."
pm2 start ./pm2.config.js --env ${name}

echo "leave server ..."
cd ../

echo "enter ssr ..."
cd /var/web/active-cms/ssr

echo "install..."
cnpm install

echo "build..."
npm run build

echo "start ssr pm2 ..."
npm run pm2-${name}

echo "启动成功"
