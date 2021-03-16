



function main () {
    // usage: node rmforeignsvg.js <file
    // reads grammar from "svg.ohm" 
    var text = getNamedFile ("-");
    var grammar = getNamedFile ("svg.ohm");
    var { parser, cst } = ohm_parse (grammar, text);
    var sem = {};
    var outputString = "";
    if (cst.succeeded ()) {
	sem = parser.createSemantics ();
	addSemantics (sem);
	outputString = sem (cst)._glue ();
    }
    return { cst: cst, semantics: sem, resultString: outputString };
}


var { cst, semantics, resultString } = main ();
console.log(resultString);
