Glue tool: generate semantics code for use with Ohm-js parser
using a very simple syntax,
for example
... XMLHeader [1 2s 3] = $1 @2s $3 ... should generate
XMLHeader = function (p1, p2s, p3) { return p1.glue () + p2s.glue.join('') + p3.glue () };
... and the rest of the semantics creation machinery ...

Grammar (only) for glue tool.
See run.bash, glue.ohm and test sample "semantics.glue"
