# store.manager
Simple store manager 🚲

## Create store

```javascript
const storeA = new Store({
    propertyNumber: 0,
    propertyBoolean: false,
    propertyObject: {
        a: true,
        b: false
    }
});
```

## Add/remove reflect to change property value

```javascript
  storeA.addReflect("propertyBoolean", console.log);
  storeA.propertyBoolean = true;
  
  // If need remove reflect use
  storeA.removeReflect("propertyBoolean");
```

## Check value as boolean type

Also u can use few arguments for group test

```javascript 
  storeA.is("propertyBoolean"); // true
  storeA.isnt("propertyBoolean", "propertyNumber"); // false
```

## Add/remove fixed range for only number type property

```javascript
  // Can use callbacks for extremum overflow
  // Support sausage notation for add/remove methods
  storeA
      .addRange("propertyNumber", [-10, 10], console.log, console.log)
      .addReflect("propertyNumber", console.log);
  
  for(let i = -50; i <= 50; i++){
      storeA.propertyNumber = i;
  }
  
  // If need remove range
  storeA.removeRange("propertyNumber"); 
  
  // If need detect ranged
  storeA.isRanged("propertyNumber"); // false
```

## Add/remove immutability lock for any type property and for nested values in object-like type property

```javascript
  storeA
      .addReflect("propertyObject", console.log)
      .addLock("propertyObject");
  
  storeA.propertyObject.a = "zero"; // reflect will not work cause property locked
  
  // If need detect lock
  storeA.isLocked("propertyObject"); // true
  
  // If need remove lock
  storeA.removeLock("propertyObject"); 
  
```

## Inline directives

For use directives add squared scoped keyword at begin of special string

###JSON

```javascript

    // Add url after directive keyword

    new Store({ removeData: "[json] https://api.myjson.com/bins/i2hdw" })
        .addReflect('remoteData', console.log);

```