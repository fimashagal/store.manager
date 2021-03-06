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
    
    // or 
    
    new Store().initialize({
        int: 28
    });
```

## Add/remove reflect to change property value

```javascript
  storeA.addReflect("propertyBoolean", console.log);
  storeA.propertyBoolean = true;
  
  // If need remove reflect use
  storeA.removeReflect("propertyBoolean");
```

## Add reflect with jerk-param for urgent executing one time after setup without data-changing

```javascript
    const x = new Store({
        int: 0
    });
    
    // Third argument it is jerk-param. By default it was false
    x.addReflect('int', console.log, true); 

```

## Export data anytime

```javascript
  storeA.exportData();
  
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

For use directives add keyword with double arrows at begin of special string


```javascript

    // Add url after directive 'json >> ' for get remote data as object

    new Store({ remoteData: "json >> https://api.myjson.com/bins/i2hdw" })
        .addReflect('remoteData', console.log);

    // Add worker path after directive 'worker >> ' for get remote data from worker

    new Store({ workerData: "worker >> worker.js" })
        .addReflect('workerData', console.log);

```

## Worker controls

You can play and stop every existing and already added worker

```javascript

    let w = new Store({ workerData: "worker >> worker.js" })
                    .addReflect('workerData', console.log);
    
    // When need stop transfer data
    setTimeout(() => w.stopWorker('workerData'), 7e3);
    
    // And run again
    setTimeout(() => w.playWorker('workerData'), 1e4);
    
    // Remove worker but stay value with reflects and other
    setTimeout(() => w.removeWorker('workerData'), 11e3);

```