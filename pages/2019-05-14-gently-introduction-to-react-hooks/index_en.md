# Gently introduction to React Hooks. Part 1.

In these series of articles I'm going to answer following quesitons:
- What are React hooks?
- Why there are React hooks?
- How to use React hooks?

From now on I assume that:
1. You have no knowledge of React hooks.
2. You have at least basic knowledge of React (any tutorial longer than 5 mins will be enough).

## My story

I've been working with React for over two years now. I must admit it was very nice two years. So I was very sceptical when I heard about React hooks for the first time. "Why change something that is good and works?" When I saw first hooks examples feeling "this is not a good direction" was even stronger. But hooks kept attacking me from every direction and more and more people seemed to be delighted with the new React addition. I decided to give them a try... and I joined a circle of delighted.

## What are React Hooks?

Hooks were introduced to React to replace using classes for creating components. Replace with what? Replace with functions.

'Whoa!' one can shout. We could create components with functions from way back. What the whole fuss with hooks is about? Before I answer this question let us make two steps back.

## How do we crate components in React?

As a general rule there are two ways to crate components in React.
1. Using classes (class components).
2. Using functions (function components).

Function components seem to be much easier:
- One doesn't have to "wrestle" with `this` keyword and remember to bind methods.
- They are more readable and faster to write.
- They are easier to test and reasoning about.

So let us ask a simple question...

## Why there are two ways for creating components in React?

If function components are so "cool" why not using only them? Why would one use classes in the first place?

Class components have two important features not available for function components:
1. They could have **state**.
2. They give access to component's lifecycle methods.

**What state is?** It's the component's ability to "remember" any information about itself.

E.g. a button component can remember whether user clicked it or not. And depend on that render itself in green or red.

**What are component's lifecycle methods?**. Component's lifecycle is the time since painting it in the browser (and even a moment before) up unitl removing it from there. Lifecycle methods let us execute any code in key moments of component's existance.

E.g. we'd like to know the height of the button. This information is avilable after the button is actually rendered in the browser.Thanks to `componentDidMount` we can have access to the button and get its height when it's rendred.

We didn't have access to these features while using function components. I used past tense becasue since React 16.8 thanks to React hooks both of these are available to function components!

## Show me some code!

Let's begin our adventure with React hooks from writing some simple class component.

We have simple component that renderes input field. The user can enter his/her name and it'll be saved in component state and displayed above the input field.

````jsx
import React from 'react';

class MyComponent extends React.Component {
    state = {
        userName: "Bob",
    }

    handleUserNameChanged = (e) => {
        this.setState({ userName: e.target.value });
    }

    render() {
        return(
            <>
                <h2>User name: {this.state.userName}</h2>
                <input
                    type="text"
                    value={this.state.userName}
                    onChange={this.handleUserNameChanged}
                />
            </>
        );
    }
}
````

Let's write a function component now. The goal is to write a component that has exactly the same functionality as the class component. Let's start with empty arrow function:

````jsx
import React from 'react';

const MyComponent = () => {
};
````

And then do the following:
1. Copy the code returned by `render()` method. It'll be returned directly by our function component.
2. Copy `handleUserNameChanged` method and add `const` keyword in front.
3. We don't have `this` keyword in function component. Delete all its occurrences.
4. We are interested in `userName` not `state.userName`. Remove all `state.` from the code.
5. We don't define `state` as an object. We define `userName` variable instead and give it a string `"Bob"` as initial value.
6. Change `setState` with a more descriptive function: `setUserName`. We pass it a value we get from input field. This function will be responsible for changing the value we keep in the `userName` variable.

Our function component should look as follows:

````jsx
import React from 'react';

const MyComponent = () => {
    const userName = "Bob";

    const handleUserNameChanged = (e) => {
        setUserName(e.target.value);
    }

    return(
        <>
            <h2>User name: {userName}</h2>
            <input
                type="text"
                value={userName}
                onChange={handleUserNameChanged}
            />
        </>
    );
}
````

At this stage our component is not working. We get information about an error: `setUserName` is not defined. Let's remind ourselves what `setUserName` should be? It should be a **function** that changes the value of the `userName`.

We're going to write a naive implementation of that function. This function will accept a new `userName` value and (for now) it'll return current `userName` value.

````jsx
const setUserName = (newUserName) => userName;
````

Now add it to our function component:

````jsx
import React from 'react';

const MyComponent = () => {
    const userName = "Bob", setUserName = (value) => userName;

    const handleUserNameChanged = (e) => {
        setUserName(e.target.value);
    }

    return(
        <>
            <h2>User name: {userName}</h2>
            <input
                type="text"
                value={userName}
                onChange={handleUserNameChanged}
            />
        </>
    );
}
````

Our code almost works. Almost because it shows input field and user name as "Bob". But we can't change that user name. Why? We are lacking the component **state** in which we could keep our new user name. We'd like to **use state* here. Luckily for us React gives us a `useState` hook.

## useState hook

