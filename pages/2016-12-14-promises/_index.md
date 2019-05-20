---
title: Promises
date: "2016-12-14T14:49:00.169Z"
layout: post
path: "/promises/"
readNext: ""
links:
  - "JavaScript Promises ... In Wicked Detail||http://www.mattgreer.org/articles/promises-in-wicked-detail/"
---

asynchronous programming
Promises always resolve asynchronously, even if they don’t have to.
(show order of execution with simple example!!!)

.then(callback) - a function that takes callback function as a parameter
.resolve(value) - a function that pass value to the callback function passed to .then function

A promise can be pending waiting for a value, or resolved with a value or rejected with the reason (value).
The promise will transition from pending to either resolved or rejected, never both.
Once a promise resolves to a value, it will always remain at that value and never resolve again.

##  Exmample: Two version: synchronous and asynchronous

### Simulating synchronous action
````javascript
function Promise(fn) {
  let state = 'pending';
  let value;
  let deferred;

  function resolve(newValue) {
    console.log(5);
    value = newValue;
    state = 'resolved';

    if(deferred) {
      console.log(5.7); //no
      handle(deferred);
    }
  }

  function handle(onResolved) {
    if(state === 'pending') {
      console.log(5.5); //no
      deferred = onResolved;
      return;
    }

    console.log(7);
    onResolved(value);
  }

  this.then = function(onResolved) {
    console.log(6);
    handle(onResolved)
  };

  console.log(2);
  fn(resolve);
}

function doSth() {
  console.log(1);
  return new Promise((resolve) => {
    console.log(3);
    var value = 200;
    console.log(4);
    resolve(value);
  });
};

console.log(0);
doSth().then((value) => {
  console.log(8);
  console.log(value);
});
console.log(9);
````


### Simulating asynchronous action

````javascript
function Promise(fn) {
  let state = 'pending';
  let value;
  let deferred;

  function resolve(newValue) {
    console.log(8);
    value = newValue;
    state = 'resolved';

    if(deferred) {
      console.log(9);
      handle(deferred);
    }
  }

  function handle(onResolved) {
    if(state === 'pending') {
      console.log(5);
      deferred = onResolved;
      return;
    }

    console.log(10);
    onResolved(value);
  }

  this.then = function(onResolved) {
    console.log(4);
    handle(onResolved)
  };

  console.log(2);
  fn(resolve);
}

function doSth() {
  console.log(1);
  return new Promise((resolve) => {
    console.log(3);
    var value = 200;
    // simulating asynchronous action
    setTimeout(() => {
      console.log(7);
      resolve(value);
    }, 1000);
  });
};

console.log(0);
doSth().then((value) => {
  console.log(11);
  console.log(value);
});
console.log(6);
````

.then() always returns a promise. This promise resolve to the return value of the previous promise.

````javascript
const foo = Promise
              .resolve('A')
              .then((res) => {
                console.log(res);
                return 'B';
              })
              .then((res) => {
                console.log(res);
                return 'C';
              })
              .then((res) => {
                console.log(res);
                return 'D';
              });
console.log(foo);
````

Promises always resolve to one value.
If you need to pass more than one value along, you need to create a multi-value in some fashion (an array, an object, concatting strings, etc)
It means that Promises always require at least one more iteration of the event loop to resolve.


The callback to then() is not strictly required. If you leave it off, the promise resolves to the same value as the previous promise.


````javascript
const foo = Promise.resolve('A').then().then(res => console.log(res)); // Prints 'A'
````

## Rejecting Promises
.then(callbackWhenResolved, callbackWhenRejected)

Second callback passed to .then() is invoked when promise is rejected.


If you don’t handle the rejection by suppling callbackWhenRejected, then the rejection propagates to the next promise in the chain.

````javascript
const foo = Promise
              .reject('A')
              .then((res) => {
                // never get here
                //and no callback for rejection
              })
              .then((res) => {
                //never get here as the promise was rejected, and wasn't recovered
              }, (err) => {
                console.log(err); //rejection propagates here
              });
````
