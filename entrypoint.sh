#!/bin/sh

npm run collectstatic
npm run collectstatic2
FORCE_COLOR=true npm start | cat
