#!/bin/bash

node glue <../svgtranspile/svg2p.glue >_svg2p-sem.js
#diff -w _svg2p-sem.js ../svgtranspile/_temp.js

node glue <glue.glue >gen-glue-sem.js
cat gen-glue1.js gen-glue-sem.js gen-glue2.js >gen-glue.js

node glue <test.glue >man-test.js
node gen-glue.js <test.glue >gen-test.js

sed -e '/^$/d' man-test.js <man-test.js >_temp
mv _temp man-test.js

sed -e '/^$/d' man-test.js <gen-test.js >_temp
mv _temp gen-test.js

diff -w gen-test.js man-test.js
