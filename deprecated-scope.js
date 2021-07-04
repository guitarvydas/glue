function scope () {
    this._stack = [];
    this._topindex = function () {return this._stack.length - 1;};
    this.put = function (key, val) {
	var i = this._topindex ();
	this._stack[i][key] = val;
    };
    this.get = function (key) {
	var i = this._topindex ();
	while (i >= 0) {
	    if (this._stack[i][key]) {
		return this._stack[i][key];
	    };
	    i -= 1;
	};
	throw "scope: key ${key} not found";
    };
    this.push = function () { this._stack.push ([]); };
    this.pop = function () { this._stack.pop (); };
}

var sc = new scope ();
sc.push ();
sc.put ("abc", "def");
sc.push ();
sc.put ("abc", "klm");
var v = sc.get ("abc");
console.log (v);
sc.pop ();
var v = sc.get ("abc");
console.log (v);
sc.pop ();

