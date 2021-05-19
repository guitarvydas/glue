#!/bin/bash
set -e

node ../glue/glue.js <../glue/glue.glue >gen-glue-sem.js
cat ../glue/gen-glue1.js gen-glue-sem.js ../glue/gen-glue2.js >gen-glue.js
node gen-glue.js <$1
