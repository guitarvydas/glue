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
  sem.addOperation (
'_glue', 
{

               svg : function (_xmlHeader,_docTypeHeader,_svgElement) { 
                          var xmlHeader = _xmlHeader._glue ();
var docTypeHeader = _docTypeHeader._glue ();
var svgElement = _svgElement._glue ();
                          return `${xmlHeader}${docTypeHeader}${svgElement}`; 
                        },
            
               xmlHeader : function (__begin,_characters,__end,__ws) { 
                          var _begin = __begin._glue ();
var characters = _characters._glue ().join ('');
var _end = __end._glue ();
var _ws = __ws._glue ().join ('');
                          return `${_begin}${characters}${_end}${_ws}`; 
                        },
            
               docTypeHeader : function (__begin,_characters,__end,__ws) { 
                          var _begin = __begin._glue ();
var characters = _characters._glue ().join ('');
var _end = __end._glue ();
var _ws = __ws._glue ().join ('');
                          return `${_begin}${characters}${_end}${_ws}`; 
                        },
            
               svgElement : function (__begin,_attributes,__gt,__ws1,_emptyDefs,_elements,__end,__ws) { 
                          var _begin = __begin._glue ();
var attributes = _attributes._glue ().join ('');
var _gt = __gt._glue ();
var _ws1 = __ws1._glue ().join ('');
var emptyDefs = _emptyDefs._glue ();
var elements = _elements._glue ().join ('');
var _end = __end._glue ();
var _ws = __ws._glue ().join ('');
                          return `${_begin}${attributes}${_gt}${_ws1}${emptyDefs}${elements}${_end}${_ws}`; 
                        },
            
               emptyDefs : function (__,__ws) { 
                          var _ = __._glue ();
var _ws = __ws._glue ().join ('');
                          return `${_}${_ws}`; 
                        },
            
               element : function (_e,__ws) { 
                          var e = _e._glue ();
var _ws = __ws._glue ().join ('');
                          return `${e}${_ws}`; 
                        },
            
               elementWithSwitch : function (__switch,__ws1,_e1,_e2,__endswitch,__ws) { 
                          var _switch = __switch._glue ();
var _ws1 = __ws1._glue ().join ('');
var e1 = _e1._glue ();
var e2 = _e2._glue ();
var _endswitch = __endswitch._glue ();
var _ws = __ws._glue ().join ('');
                          return `${e2}`; 
                        },
            
               elementWithForeign : function (__foreign,_attributes,__gt,__ws1,_e,__endforeign,__ws) { 
                          var _foreign = __foreign._glue ();
var attributes = _attributes._glue ().join ('');
var _gt = __gt._glue ();
var _ws1 = __ws1._glue ().join ('');
var e = _e._glue ();
var _endforeign = __endforeign._glue ();
var _ws = __ws._glue ().join ('');
                          return `${_foreign}${attributes}${_gt}${_ws1}${e}${_endforeign}${_ws}`; 
                        },
            
               elementWithelements : function (__begin,_name,_attributes,__gt,__ws1,_e,__end1,_name,__end2,__ws) { 
                          var _begin = __begin._glue ();
var name = _name._glue ();
var attributes = _attributes._glue ().join ('');
var _gt = __gt._glue ();
var _ws1 = __ws1._glue ().join ('');
var e = _e._glue ().join ('');
var _end1 = __end1._glue ();
var name = _name._glue ();
var _end2 = __end2._glue ();
var _ws = __ws._glue ().join ('');
                          return `${_begin}${name}${attributes}${_gt}${_ws1}${e}${_end1}${name}${_end2}${_ws}`; 
                        },
            
               elementWithoutelements : function (__begin,_name,_attributes,__end) { 
                          var _begin = __begin._glue ();
var name = _name._glue ();
var attributes = _attributes._glue ().join ('');
var _end = __end._glue ();
                          return `${_begin}${name}${attributes}${_end}`; 
                        },
            
               stuff : function (_c) { 
                          var c = _c._glue ();
                          return `${c}`; 
                        },
            
               text : function (_c) { 
                          var c = _c._glue ();
                          return `${c}`; 
                        },
            
               attribute : function (_c) { 
                          var c = _c._glue ();
                          return `${c}`; 
                        },
            
               name : function (_c1,_cRest) { 
                          var c1 = _c1._glue ();
var cRest = _cRest._glue ().join ('');
                          return `${c1}${cRest}`; 
                        },
            
               name1st : function (_c) { 
                          var c = _c._glue ();
                          return `${c}`; 
                        },
            
               nameFollow : function (_c) { 
                          var c = _c._glue ();
                          return `${c}`; 
                        },
            
               ws : function (_c) { 
                          var c = _c._glue ();
                          return `${c}`; 
                        },
            
_terminal: function () { return this.primitiveValue; }
}); 
}




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
