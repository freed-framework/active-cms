#!/bin/bash

echo "delete dist"
rm -rf /var/web/active-cms/server/dist
echo "start..."
cd /var/web/active-cms/server
echo "pull..."
git pull
echo "install..."
#npm install
echo "build..."
npm run prestart:prod
echo "stop pm2..."
pm2 stop all
#echo "move..."
#rm -rf /var/web/dist && mv /var/web/active-cms/server/dist /var/web/dist
echo "cd dist/"
#cd /var/web/dist
echo "start pm2 ..."
npm run pm2-dev
pm2 list
echo "ok..."
