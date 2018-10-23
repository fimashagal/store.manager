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

## Add/remove fixed range for only number values

```javascript
  storeA.addRange("propertyNumber", [-10, 10], console.log, console.log);
  
  storeA.addReflect("propertyNumber", console.log);
  
  for(let i = -50; i <= 50; i++){
      storeA.propertyNumber = i;
  }
  
  // If need remove range
  storeA.removeRange("propertyNumber"); 
  
  // If need detect ranged
  storeA.isRanged("propertyNumber"); // false
```

## Add/remove immutability lock for any type values and for nested properties in object-like values

```javascript
  storeA.addReflect("propertyObject", console.log);
  
  storeA.addLock("propertyObject");
  
  storeA.propertyObject.a = "zero"; // reflect will not work
  
  // If need detect lock
  storeA.isLocked("propertyObject"); // false
  
  // If need remove lock
  storeA.removeLock("propertyObject"); 
  
```
