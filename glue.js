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
