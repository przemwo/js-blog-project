---
title: Javascript Maps and WeakMaps
date: "2016-12-16T12:00:00.169Z"
layout: post
path: "/javascript-maps-and-weakmaps/"
readNext: ""
links:
---

# TODO: why WEAK? (no memory leaks)

The WeakMap is a **collection** of key/value pairs.
Keys must be objects (Object type).

WeakMaps provide a way to extend objects from the outside.

`null` is treated as `undefined`

WeakMap keys are not enumerable (i.e. there is no method giving you a list of keys).
If you want that list you should use a Map.

### Methods

**WeakMap.prototype.set(key, value)** - sets the value for the key. Returns the WeakMap object.
**WeakMap.prototype.get(key)** - returns value associated with the key.
**WeakMap.prototype.delete(key)** - removes value associated with the key.
**WeakMap.prototype.has(key)** - returns boolean.

Use case:
Keeping data (values) about DOM nodes (key).
````javascript
const domNodes = new WeakMap();
domNodes.set(<some DOM node>, someValueAboutThatNode);
````


### Example

Have two objects (objA, objB) and mehtod that uses those objects (useObj).
I want to know how many times each these objects was passed to the useObj method.
I will use objA four times and objB one time.
I want to keep track that information (objA - four times, objB - one time).

````javascript
const objA = {foo: 'bar'};
const objB = {foo: 'baz'};

const map = new WeakMap();

function useObj(obj) {
  let called = map.get(obj) || 0;
  called++;
  map.set(obj, called);
}

useObj(objA);
useObj(objA);
useObj(objA);
useObj(objA);
useObj(objB);
console.log(map.get(objA));
console.log(map.get(objB));
````
