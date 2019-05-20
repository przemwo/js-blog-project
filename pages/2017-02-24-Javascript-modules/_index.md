---
title: Javascript Modules
date: "2017-02-24T12:00:00.169Z"
layout: post
path: "/javascript-modules/"
readNext: ""
links:
---

#Javascript Modules

##Modules
A **module** is a reusable piece of code that encapsulates implementation details and exposes a public API so it can be easily loaded and used by other code.

##Module formats
A **module format** is the syntax we use to define a module:
*	AMD – define(…)
*	CommonJS – require(…), module.exports = …
* UMD – AMD/CommonJS
*	System.register
*	ES6 module format – Javascript native module format

To use ES6 module format today we need transpiler like **Babel** to transpile our code to an ES5 module format (such as AMD, CommonJS, UMD, System.register).

##Module loaders
A **module loader** interprets and loads a module written in a certain module format **at runtime**.
Popular examples are:
*	RequireJS
*	SystemJS

##Module bundlers
A **module bundler** replaces a module loader and generates a bundle of all code **at build time**.
Popular examples are:
*	Browserify
*	Webpack
