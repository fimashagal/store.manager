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
                    if(self.isImmutabled(key)) {
                        return false;
                    }
                    self._reflect(key, prxValue);
                    prxTarget[prxKey] = prxValue;
                    return true;
                },
                deleteProperty(prxTarget, prxKey) {
                    if(self.isImmutabled(key)) {
                        return false;
                    }
                    self._reflect(key, Object.create(null));
                    delete prxTarget[prxKey];
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
                    if(self._typeOf(value) === dataItem.type && !self.isImmutabled(key)){
                        if(self._isNum(value) && self.isRanged(key)){
                            value = self._holdInRange(key, value);
                        }
                        if(value !== dataItem.value){
                            self._reflect(key, value);
                            dataItem.value = value;
                            return true;
                        }
                    }
                }
            }
        });
    }
    this.reflects = {};
    this.rangedNumbers = {};
    this.immutables = {};
    return this;
}

Store.prototype.is = function(...args){
    return this._isMarriage(args);
};

Store.prototype.isnt = function(...args){
    return !this._isMarriage(args);
};

Store.prototype.addReflect = function(key, fn){
    if(key in this && this._isFn(fn)) this.reflects[key] = fn;
};

Store.prototype.removeReflect = function(key){
    delete this.reflects[key];
};

Store.prototype.addRange = function(key, range, minReflect, maxReflect){
    if(this._typeOf(this[key]) !== "number"
        || !Array.isArray(range)
        || range.length !== 2
        || !range.every(item => this._isNum(item))) return;

    if(range[1] < range[0]) {
        range.reverse();
    }

    this.rangedNumbers[key] = { range: range };
    let rangeObject = this.rangedNumbers[key];
    if(this._isFn(minReflect)) {
        rangeObject.minReflect = minReflect;
    }
    if(this._isFn(maxReflect)) {
        rangeObject.maxReflect = maxReflect;
    }

    this.rangedNumbers[key] = Object.freeze(rangeObject);

    this[key] = this._holdInRange(key, this[key]);
};

Store.prototype.removeRange = function(key){
    delete this.rangedNumbers[key];
};

Store.prototype.isRanged = function(key = ""){
    return this._isFeatured('rangedNumbers', key);
};

Store.prototype.addImmutability = function(key){
    if(!key in this) return;
    this.immutables[key] = true;
};

Store.prototype.removeImmutability = function(key){
    delete this.immutables[key];
};

Store.prototype.isImmutabled = function(key = ""){
    return this._isFeatured('immutables', key);
};

Store.prototype._reflect = function (key, value) {
    let { reflects } = this;
    if(key in reflects && this._isFn(reflects[key])) {
        reflects[key](value);
    }
};

Store.prototype._typeOf = function (object) {
    return Object.prototype.toString
        .call(object)
        .replace(/^\[object (.+)\]$/, '$1')
        .toLowerCase();
};

Store.prototype._holdInRange = function(key, value){
    let rangeObject = this.rangedNumbers[key],
        [min, max] = rangeObject.range,
        {minReflect, maxReflect} = rangeObject;
    if(value < min) {
        this._isFn(minReflect) && minReflect(min);
        return min;
    }
    if(value > max){
        this._isFn(maxReflect) && maxReflect(max);
        return max;
    }
    return value;
};

Store.prototype._isFn = function(fn) {
    return this._typeOf(fn) === "function";
};

Store.prototype._isNum = function(num) {
    return this._typeOf(num) === "number" && !isNaN(num);
};

Store.prototype._isMarriage = function(array) {
    for(let key of array){
        if(!Boolean(this[key])) return false;
    }
    return true;
};

Store.prototype._isFeatured = function(groupName, key) {
    if(!groupName in this) {
        return false;
    }
    for(let item of Object.keys(this[groupName])){
        if(item === key) return true;
    }
    return false;
};
