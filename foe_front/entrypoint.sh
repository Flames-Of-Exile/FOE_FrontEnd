#!/bin/sh

npm run collectstatic
npm run sass
FORCE_COLOR=true npm start | cat