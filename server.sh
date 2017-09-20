#!/bin/bash

echo "delete dist"
rm -rf /var/web/static/active-cms/server/dist
echo "start..."
cd /var/web/static/active-cms/server
echo "pull..."
git pull
echo "install..."
npm install
echo "build..."
npm run prestart:prod
echo "stop forever..."
forever stopall
echo "move..."
rm -rf /var/web/dist && mv /var/web/static/active-cms/server/dist /var/web/dist
echo "cd dist/"
cd /var/web/dist
echo "start forever"
forever start main.js
forever list
echo "ok..."
