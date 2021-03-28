#!/bin/bash

#node glue <../svgtranspile/svg2p.glue >_svg2p-sem.js
#diff -w _svg2p-sem.js ../svgtranspile/_temp.js

node glue <glue.glue >gen-glue-sem.js
cat gen-glue1.js gen-glue-sem.js gen-glue2.js >gen-glue.js
node gen-glue.js <$1
