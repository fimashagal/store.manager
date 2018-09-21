"use strict";

"use strict";

function Store(data = {}) {
    const self = this,
        _ = {};
    if(data.reflects) delete data.reflects;
    for(let [key, value] of Object.entries(data)){
        let valueType = this._typeOf(value);
        if(/object|array/.test(valueType)){
            value = new Proxy(value, {
                set(prxTarget, prxKey, prxValue){
                    self._reflect(key, prxValue);
                    prxTarget[prxKey] = prxValue;
                    return true;
                }
            });
        }
        _[key] = {
            value: value,
            type: valueType
        };
        Object.defineProperties(this, {
            [key]: {
                get(){
                    return _[key].value;
                },
                set(value){
                    let dataItem = _[key];
                    if(self._typeOf(value) === dataItem.type
                        && value !== dataItem.value){
                        self._reflect(key, value);
                        dataItem.value = value;
                        return true;
                    }
                }
            }
        });
    }
    this.reflects = {};
    return this;
}


Store.prototype.is = function(key){
    return Boolean(this[key]);
};

Store.prototype.isnt = function(key){
    return !Boolean(this[key]);
};

Store.prototype.addReflect = function(key, fn){
    if(key in this && this._isFn(fn)) this.reflects[key] = fn;
};

Store.prototype.removeReflect = function(key){
    delete this.reflects[key];
};

Store.prototype._reflect = function (key, value) {
    let { reflects } = this;
    if(key in reflects && this._isFn(reflects[key])) reflects[key](value);
};

Store.prototype._typeOf = function (object) {
    return Object.prototype.toString
        .call(object)
        .replace(/^\[object (.+)\]$/, '$1')
        .toLowerCase();
};

Store.prototype._isFn = function(fn) {
    return this._typeOf(fn) === "function";
};