// npm install ohm-js

function ohm_parse (grammar, text) {
    var ohm = require ('ohm-js');
    var parser = ohm.grammar (grammar);
    var cst = parser.match (text);
    if (cst.succeeded ()) {
	return { parser: parser, cst: cst };
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
	
	Semantics: function (_1s) { var __1 = _1s._glue ().join ('\n'); },
	SemanticsStatement: function (_1, _2, _3, _4, _5, _6) {
	    var __1 = _1.glue ();
	    var __2 = _2.glue ();
	    var __3 = _3.glue ();
	    var __4 = _4.glue ();
	    var __5 = _5.glue ();
	    var __6 = _6.glue ();
	    return `
               ${__2} : function (${__4}) = { return \`${__6}\`; },
            `;
	},
	RuleName: function (_1, _2s) { var __1 = _1._glue (); var __2 = _2._glue ().join (''); return __1 + __2; },
	Parameters: function (_1s) {  var __1 = _1s._glue ().join ('\n'); return __1; },
	
	Parameter: function (_1) { var __1 = _1._glue ();  },
	flatparameter: function (_1) { var __1 = _1._glue (); parameterNameStack.push (`_${__1}`); return `var _${__1} = ${__1}._glue ();` },
	fpws: function (_1, _2s) { var __1 = _1._glue (); var __2 = _2s._glue ().join (''); return __1; },
	fpd: function (_1, _2) { var __1 = _1._glue (); var __2 = _2._glue (); return __1; },
	treeparameter: function (_1, _2) { var __1 = _1._glue; parameterNameStack.push (`_${__1}`); return `var _${__1} = ${__1}._glue ().join ('')`; },

	pname: function (_1, _2s) {},
	Rewrites: function (_1) { var __1 = _1._glue (); return __1; },
	letter1: function (_1) { var __1 = _1._glue (); return __1; },
	letterRest: function (_1) { var __1 = _1._glue (); return __1; },

	ws: function (_1) { var __1 = _1._glue (); return __1; },
	delimiter: function (_1) { return ""; },

	rwstring: function (_1s) { var __1 = _1._glue (); return __1; },
	stringchar: function (_1) { var __1 = _1._glue (); return __1; },

	_terminal: function () { return this.primitiveValue; }
    });
}

function main () {
    // usage: node glue <file
    // reads grammar from "glue.ohm" 
    var text = getNamedFile ("-");
    var grammar = getNamedFile ("glue.ohm");
    var { parser, cst } = ohm_parse (grammar, text);
    var sem = {};
    if (cst.succeeded ()) {
	sem = parser.createSemantics ();
	addSemantics (sem);
    }
    return {cst: cst, semantics: sem};
}


var { cst, semantics } = main ();
console.log(cst.succeeded ());
