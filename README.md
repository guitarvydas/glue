Glue tool: generate semantics code for use with Ohm-js parser
using a very simple syntax, (see below)

New grammar for glue tool.
See run.bash, glue.ohm, glue.js and test sample "semantics.glue"

Future: need to add JS `...` syntax

for example:

... XMLHeader [x @y z] = abc${x}def${y}ghi${z}jkl ... should generate

XMLHeader = function (_x, _y, _z) {
  var x = _x.glue ();
  var y = _y.glue.join('');
  var z = _z.glue ();
  return `abc${x}def${y}ghi${z}jkl`
}

... plus all of semantics machinery for ohm-js ...
