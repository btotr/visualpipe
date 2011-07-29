// helper functions

Element.prototype.addClassName = function(className){
    if(!this.getAttribute("class")) this.setAttribute("class", "");
    var classNames = this.getAttribute("class").split(" ");
    if (classNames.indexOf(className) == -1) classNames.push(className)
    this.setAttribute("class", classNames.join(" "));
}

Element.prototype.hasClassName = function(className){
    if(!this.getAttribute("class")) return false;
    var classNames = this.getAttribute("class").split(" ");
    if (classNames.indexOf(className) == -1) return false;
    return true;
}

Element.prototype.removeClassName = function(className){
    this.setAttribute("class", this.getAttribute("class").replace(className, ""));
}

if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== "function")
        	throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");
        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function() {},
        fBound = function() {
            return fToBind.apply(this instanceof fNOP ? this: oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
