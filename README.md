# Redux Two

In this lecture we introduce `react-redux` which is the official bindings for redux in react.

## Redux Review

Redux is a tool that was created by Dan Abromav that we can use to help manage the `state` for our application. It introduces something known as `application state` and will allow any component that `subscribes` to the `store` to access it.

### Redux Dataflow

In React, data flows unidirectionally. This means that we can only pass data from a parent to a child component. This can become a hassle and pretty complex when we start dealing with vary large scaled applications.

Redux will introduce a `source of truth` and allow us to store our state in a single place called the `store` that any of our components can `subcribe` to, to gain access to the stateful values directly instead of having to pass that data from component to component until it reaches it's destination.

Components will then `dispatch` changes to the store to update the state values, and all of the other components that are `subscribed` to the store will recieve those state updates.

![Redux VS No Redux](images/reduxflow.png)

The key part of what makes Redux work is the `Reducer`.

### Reducer

In Redux, we will write a function that will handle all of the reductions made. This function will take in the current redux state object and an object that contains a set of instructions on how to update the state. Then it will return a new mashed object.

This functions is what is known as a `reducer` function.

The object with the set of instructions that the `reducer` receives is what we call an `action`. This `action` object will include a `type` and a `payload`.

```js
let action = {
    type: 'update_name',
    payload: 'Kyle'
};
```

The `type` will always be required for the action object so it knows exactly how we are updating the current state. Keep in mind that their can only be one type on the action object.

The `payload` will be the new value that we are adding to our state, or using to update an existing value.

Now let's take a look at the `reducer` function in action.

```js
function reducer(state, action){
    switch(action.type){
        case 'update_name':
            return Object.assign({}, state, {name: action.payload});
    }
}
```

Above we are receiving the current state and the set of instructions on how to update state (action) as arguments. Then we check to what type of action we have recieved and then execute the case inside the switch statement that matches the action type. It then returns a object that will be our updated state object.

![reducer pattern](images/reducer.png)

This pattern that's using actions and reducer functions to update state is what makes up around 85% of redux.

Now you're probably asking "How do we implement this in React?". We will need to first create a `store` to and bring in all of our reducer functions into it.

### Action Builder

Instead of just using a normal `action` object, we will create a function that delivers that action object. This function will accept the payload as a parameter, then we will form an action object that will be returned from the function.

It will look something like this.
```js

function updateUser(payload){
    // create action object
    const action = {
        type: 'UPDATE_USER',
        payload: payload
    };
    // return action object
    return action;
}
```

This will be a more efficiant way to deliver that action object to our reducer.

### Store

The `store` is what holds the redux state tree for our application. The only way to change the values on this state is to `dispatch` an action to it.

We will create our store by passing our reducer into it. 

```js
import {createStore} from 'redux';
import reducer from './reducer';
// this function creates the store and we pass our root reducer to it
export default createStore(reducer);
```

## React Redux

React Redux is the official binding for using redux in a react application. This means that the `react-redux` package was created, and is maintined by the react team, specifically for using react & redux together.

Why should we use this? It's because the `react-redux` package follows the main core principles of react much better than vanilla redux. Before we were throwing the redux state into the local state of the component, but that's not really best practice because we want to keep our local state specifically for values that should be local to our component and not for an outside state manager.

Props are what we use in react to reference stateful values that come from outside sources (other components) so it would make more since for us to stick our redux values onto the `props` of the component rather than local state. react-redux does just this. When we subscribe to the redux store using the higher order component `connect` from react-redux, it will map that redux state to the props of the component.

