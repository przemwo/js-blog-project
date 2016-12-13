---
title: What's the difference between Object.create and new keyword?
date: "2016-12-13T20:15:00.169Z"
layout: post
path: "/what-the-difference-between-object-create-and-new-keyword/"
readNext: ""
links:
  - "Object.Create - Object Creation in JavaScript by FunFunFunction||https://www.youtube.com/watch?v=CDFN1VatiJA"
  - "Object.Create on MDN||https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create"
  - "Object.create(): the New Way to Create Objects in JavaScript||http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html"
  - "JavaScript inheritance: Object.create vs new on stackoverflow||http://stackoverflow.com/a/13041474"
---

Take a look at this code:

````javascript
const Foo = function() {}

const bar = new Foo();

const baz = Object.create(Foo.prototype);
````

We can use both `Object.create` and `new` keyword to create new objects and sets its prototypes to some other object's prototype
(to `Foo.prototype` here).
So what's the difference between them?

Let's start by seeing what's happening when we create a new object using `new` keyword.

## Create an object by using new keyword

First let's make a constructor function and name it `Foo`:

````javascript
const Foo = function() {};
````

This function will be used to create a new object.
So let's create a new object and name it `bar`:

````javascript
const bar = new Foo();
````

What's happening when the code `new Foo()` is executed?

1. The code above creates and return a new object and assign it to the `bar` variable.
2. Prototype of this newly created object is set to the `Foo.prototype` (`bar.__proto__ === Foo.prototype`).
3. The constructor function (`Foo`) is called.


## Create an object by using Object.create

Now let's see what `Object.create` method does.
In order to do so let's create an `Object.create` polyfill first:

````javascript
if(!Object.create) {
    Object.create = function(o) {
        function F(){};
        F.prototype = o;
        return new F();
    };
}
````
As you can see `Object.create` returns an instance of an **empty object** (F constructor has no properties) with its prototype set to an object passed as an argument.

Now let's create a new object by calling `Object.create` method:

````javascript
const baz = Object.create(Foo.prototype);
````

What's happening here?

1. The code above creates and return a new object and assign it to the `baz` variable.
2. Prototype of this newly created object is set to the `Foo.prototype` (`bar.__proto__ === Foo.prototype`).

Can you spot the difference now?

Yes! The difference is that when we use `Object.create` method for creating an object
it sets its prototype to `Foo.prototype`. But the `Foo` constructor function is not called at all.

We can use it when we want to create a new object with a prototype set to some other object
but without calling its constructor function. It may be very handy when we want to implement inheritance.

But let's do a simple example.

## Example

First let's recreate our `Foo` constructor function.
And add some variable to it.

````javascript
const Foo = function() {
  this.greet = 'Hello world!';
}
````

We add `greeting` method to `Foo` prototype which prints the value of the `greet` variable:

````javascript
Foo.prototype.greeting = function() {
  console.log('I want to say: ' + this.greet);
};
````

Next create new objects as before:

````javascript
const bar = new Foo();

const baz = Object.create(Foo.prototype);
````

What would happen when we try to call `greeting` methods on these newly created objects?

````javascript
bar.greeting();  // prints 'I want to say: Hello world!'

baz.greeting();  // prints `I want to say: undefined`
````

As you can see `greeting` method is available for both `bar` and `baz` objects.
But when we call `baz.greeting()` we get "I want to say: undefined" printed to the console.

This is because when we created `baz` object we **didn't** call `Foo` constructor function where the `greet` variable was declared.
So `greet` varaible inside `baz.greeting` method remains undefined.
