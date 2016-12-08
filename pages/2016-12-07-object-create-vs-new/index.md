---
title: What's the difference between Object.create and new keyword?
date: "2016-12-07T22:40:32.169Z"
layout: post
path: "/what-the-difference-between-object-create-and-new-keyword/"
---

Let's start from understanding what `Object.create` method does.
In order to do so let's see how basic `Object.create` polyfill looks like:

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

We can use it to create a new object with a prototype set to some other object.
So why not just use `new` keyword instead?
What's the difference between creating an object by calling `Object.create` and using `new` keyword?

# TODO: Example!!!

Let's say we have `Foo` constructor function like this:

````javascript
// Foo constructor
const Foo = function() {};
````

We add `greeting` method to Foo prototype:

````javascript
//Adding greeting method to Foo prototype
Foo.prototype.greeting = function() {
  console.log('Hi there!')
};

//Creating bar object using Object.create
//and setting its prototype to Foo prototype
const bar = Object.create(Foo.prototype);

//Creating baz object using new keyword
const baz = new Foo();
````

The difference is that when we use `Object.create` method for creating an object it only uses the `Foo` prototype without calling the `Foo` constructor function.

It may be very handy when we want to implement inheritance.


I don't know about you but I've noticed that whenever
I want to learn something new in programming, taking a look what's going on behind the scenes helps me a lot.



*   This however showed weasel
*   Well uncritical so misled
    *   this is very interesting
*   Goodness much until that fluid owl

When she reached the first hills of the **Italic Mountains**, she
had a last view back on the skyline of her
hometown _Bookmarksgrove_, the headline of [Alphabet
Village](http://google.com) and the subline of her own road, the
Line Lane. Pityful a rethoric question ran over her cheek, then she
continued her way. On her way she met a copy.

> Far far away, behind the word mountains, far from the countries
> Vokalia and Consonantia, there live the blind texts. Separated
> they live in Bookmarksgrove right at the coast of the Semantics, a
> large language ocean. 

1.  So baboon this
2.  Mounted militant weasel gregariously admonishingly straightly hey
3.  Dear foresaw hungry and much some overhung
4.  Rash opossum less because less some amid besides yikes jeepers frenetic impassive fruitlessly shut
