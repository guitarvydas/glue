// npm install ohm-js

function ohm_parse (grammar, text) {
    var ohm = require ('ohm-js');
    var parser = ohm.grammar (grammar);
    var result = parser.match (text);
    if (result.succeeded ()) {
	return result.succeeded ();
    } else {
	console.log (parser.trace (text).toString ());
	throw "Ohm matching failed";
    }
}

function getNamedFile (fname) {
    var fs = require ('fs');
    if (fname === undefined || fname === null || fname === "-") {
	return fs.readFileSync (0, 'utf-8');
    } else {
	return fs.readFileSync (fname, 'utf-8');
    }	
}

function addSemantics (sem) {
    sem.addOperation ('_glue', {
	Semantics: function (_1s) {},
	SemanticsStatement: function (_1, _2, _3, _4, _5, _6) {},
	RuleName: function (_1, _2s) {},
	Parameters: function (_1s) {},
	Parameter: function (_1) {},
	flatparameter: function (_1) {},
	fpws: function (_1, _2s) {},
	fpd: function (_1, _2) {},
	treeparameter: function (_1, _2) {},

	pname: function (_1, _2s) {},
	Rewrites: function (_1) {},
	letter1: function (_1) {},
	letterRest: function (_1) {},

	ws: function (_1) {},
	delimiter: function () {},

	rwstring: function (_1s) {},
	stringchar: function (_1) {},

	_terminal: function () { return this.primitiveValue; }
    });
}

function main () {
    // usage: node glue <file
    // reads grammar from "glue.ohm" 
    var text = getNamedFile ("-");
    var grammar = getNamedFile ("glue.ohm");
    var parsed = ohm_parse (grammar, text);
    return parsed;
}


var result = main ();
console.log(result);
