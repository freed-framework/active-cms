#!/bin/bash

if [ $# -eq 0 ]; then  
    name='pro'  
else
    name=$1
fi

projectPath = ${projectPath}

echo "delete dist"
rm -rf ${projectPath}/server/dist
rm -rf ${projectPath}/ssr/lib
rm -rf ${projectPath}/client/dist

echo "start..."
cd ${projectPath}

echo "pull..."
git pull

echo "enter client ..."
cd ${projectPath}/client

echo "install client"
cnpm install

echo "build"
npm run build
npm run build-mobile
npm run build-pc

echo "stop pm2..."
pm2 delete all 

echo "enter server"
cd ${projectPath}/server

echo "install..."
cnpm install

echo "build server..."
npm run prestart:prod

echo "start server pm2 ..."
pm2 start ./pm2.config.js --env ${name}

echo "leave server ..."
cd ../

echo "enter ssr ..."
cd ${projectPath}/ssr

echo "install..."
cnpm install

echo "build..."
npm run build

echo "start ssr pm2 ..."
npm run pm2-${name}

pm2 restart all

echo "启动成功"
