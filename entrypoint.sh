#!/bin/sh

npm run collectstatic
npm run collectstatic2
npm run sass
FORCE_COLOR=true npm start | cat
