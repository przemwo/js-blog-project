---
title: Gently introduction to React Hooks. Part 2
date: "2019-05-25T12:00:00.169Z"
layout: post
path: "/gently-introduction-to-react-hooks-part-2/"
readNext: ""
links: ""
description: If you want to learn React Hooks in a gently way you are in a good place.
---

This is the second part of the series **Gently introduction to React Hooks**. I encourage you to read the first part if you haven't already done so:

- [Gently introduction to React Hooks. Part 1](https://dev.to/przemwo/gently-introduction-to-react-hooks-part-1-1a47)

Let's start exactly where we left. Our component works. The user can enter his name in the input field. Let's add new functionality to it.

We want the text in the input field (user name "Bob") to be automatically selected after the component is rendered. Thanks to this, the user will be able to easily and conveniently change the value of this field without the need to use the mouse.

Consider how to write such functionality?
First of all, our component (which contains the input field) must be actually rendered (painted in the browser). Then we need to have access directly from our code to the input element. Finally, we select the text in there (the initial value of `userName`).

## Let's write some code

We'll with the start as before from the class component. Later, we will transform it into a functional component that will use **React Hooks**.

To access the rendered component (including our input field), we must use the `componentDidMount` lifecycle method.
In addition, in order to actually "catch" this input field, we must create a reference to it and store it in a variable. This will be provided by the `createRef` method.
Finally, having reference to the rendered input field, we will use the `select` method, which will select the text.

I marked new elements in the code.

```jsx
import React from 'react';

class MyComponent extends React.Component {
    state = {
        userName: "Bob",
    }
    
    handleChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    };

    //create new reference
    inputRef = React.createRef();

    //code in the componentDidMount will be executed after the component has been rendered
    componentDidMount() {
        //using the reference to the input field we select the text in it
        this.inputRef.current.select();
    }

    render() {
        return(
            <div className="card">
                <h2>User name: <span>{this.state.userName}</span></h2>
                <input
                    //we set a reference to the input field
                    ref={this.inputRef}
                    type="text"
                    name="userName"
                    id="userName"
                    value={this.state.userName}
                    onChange={this.handleChangeUserName}
                />
            </div>
        );
    }
}
```

It's time to rewrite the class component into a functional one. Let's start where we finished in the [previous part] (https://dev.to/przemwo/gently-introduction-to-react-hooks-part-1-1a47).
Next copy the new elements from the class component and remove references to `this` and add the missing` const`.

Our functional component at this stage should look like this:

```jsx
import React, { useState } from 'react';

const MyComponent = () => {
    const [userName, setUserName] = useState("Bob");

    const handleUserNameChanged = (e) => {
        setUserName(e.target.value);
    }

    //const added
    const inputRef = React.createRef();

    componentDidMount() {
        //this. removed
        inputRef.current.select();
    }

    return (
        <>
            <h2>User name: {userName}</h2>
            <input
                //this. removed
                ref={inputRef}
                type="text"
                value={userName}
                onChange={handleUserNameChanged}
            />
        </>
    );
}
```

In the function component, like in the class one, if you want to use the reference to the rendered element, you can use `createRef`. However, React provides us with a special hook when we want to use the reference. It's called `useRef`. Let's use it in our example.

```jsx
//import useRef hook
import React, { useState, useRef } from 'react';

const MyComponent = () => {
    const [userName, setUserName] = useState("Bob");

    const handleUserNameChanged = (e) => {
        setUserName(e.target.value);
    }

    //switched to useRef
    const inputRef = useRef();

    componentDidMount() {
        inputRef.current.select();
    }

    return (
        <>
            <h2>User name: {userName}</h2>
            <input
                ref={inputRef}
                type="text"
                value={userName}
                onChange={handleUserNameChanged}
            />
        </>
    );
}
```

In our example, the use of `useRef` will have the same result as using `createRef`. These two methods, however, differ from each other. If you are interested in what the difference is, I recommend reading [this] (https://stackoverflow.com/a/54620836) text.

## And what about `componentDidMount`?

There is no `componentDidMount` method in function components. So how can we get to the already rendered component? We need to use another hook: `useEffect`.

## useEffect hook

`useEffect` hook looks like this:

```jsx
useEffect(() => {
    //effect's code goes here
});
```

`useEffect` is a function that takes a callback function as a parameter. The code inside this callback function (let's call it effect) will be executed after **each** rendering of our component. After each means also after the first one. And in our case that's what we need.

Let's import `useEffect` hook and replace `componentDidMount`:

```jsx
//imports useEffect
import React, { useState, useRef, useEffect } from 'react';

const MyComponent = () => {
    const [userName, setUserName] = useState("Bob");
    
    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };
    
    const inputRef = useRef();

    //useEffect instead of componentDidMount
    useEffect(() => {
        inputRef.current.select();
    });

    return (
        <div className="card">
            <h2>User name: <span>{userName}</span></h2>
            <input
                ref={inputRef}
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={handleChangeUserName}
            />
        </div>
    );
};
```

Our component works. Well, almost. "Almost" because it selects the text in the input field right after the first rendering of the component, but it does so every time a new character is entered. This is not what we want!

As I wrote before, the function passed to `useEffect` is executed after each render. When user enters a new character in the input field, the new value of `userName` is saved to the state, which in turn causes next render of the component. Then function passed to `useEffect` is executed again and the text in the input field is selected. We have to fix it!

`useEffect` can accept an array as a second parameter. Elements of this array are variables. Our effect depends on these variables. After each render, React checks whether one of these variables has changed and runs the the effect.

```jsx
useEffect(() => {
    //effect's code goes here
}, [/* list of dependencies */]);
```

In our case, we want the effect (selecting text in the input field) to run once (just after the first renderer), and then remain insensitive to further changes in our component. Whatever changes in our component (eg the user enters a new name) the effect should not run anymore. So we want the dependency array to be empty. Let's write it!

```jsx
useEffect(() => {
    //effect's code goes here
}, []); //empty array of dependencies
```

This code means that the effect will run once and only once (after the first render).

This is the equivalent of **`componentDidMount`** lifecycle method.

That's exactly what we missed. So let's fix our functional component:

```jsx
import React, { useState, useRef, useEffect } from 'react';

const MyComponent = () => {
    const [userName, setUserName] = useState("Bob");
    
    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };
    
    const inputRef = useRef();
    
    useEffect(() => {
        inputRef.current.select();
    }, []); // effect has no dependencies

    return (
        <div className="card">
            <h2>User name: <span>{userName}</span></h2>
            <input
                ref={inputRef}
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={handleChangeUserName}
            />
        </div>
    );
};
```

We have it! Our component works as we wished. We have rewritten a class component into a function component that works exactly the same. It uses **state** and **life cycle method**.

## But I still do not understand these delights

I understand you perfectly. I had the same myself. What's all this fuss about React Hooks about? Why learn a new syntax since the result is exactly the same as before?

However, if you stay with me in the next part of **Gently intorduction to React Hooks** you should have the first moment: "Ok, that's cool."
