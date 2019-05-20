---
title: "What's the difference between using React setState with updater function or with plain object?"
date: "2018-06-05T12:00:00.169Z"
layout: post
path: "/react-setstate/"
readNext: ""
links:
---

#What's the difference between using React setState with updater function or with plain object?

````javascript
class Foo {
  queue = [];

  setState = (item) => this.queue = [...this.queue, item];

  updateState = () => {
    let newState = Object.assign({}, this.state);
    this.queue.forEach((item) => {
      const obj = (typeof item === 'function') ? item(newState) : item;
      newState = Object.assign({}, newState, obj);
    });
    this.state = Object.assign({}, newState);
    this.queue = [];
  }
}

class MyComponent extends Foo  {
  state = {
    counter: 0
  };

  handleSomeActionThatUpdatesState = () => {
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ counter: this.state.counter + 10 });
    this.setState((prevState) => ({ counter: prevState.counter + 100 }));

    // should be called automatically after last setState call
    this.updateState();
  }
}

const myComponent = new MyComponent();
myComponent.handleSomeActionThatUpdatesState();
myComponent.handleSomeActionThatUpdatesState();
console.log(myComponent.state);
````