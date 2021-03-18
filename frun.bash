#!/bin/bash
./f1run.bash
cat rmforeignsvg1.js _temp.js rmforeignsvg2.js >rmforeignsvg.js
node rmforeignsvg <test.svg >_out.svg


