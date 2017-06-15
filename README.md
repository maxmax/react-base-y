### Pre-requisites

```
brew update

brew install yarn
```

### Base example

```
git clone https://github.com/maxmax/react-base-y
cd react-base-y
yarn install
yarn start
```

### Getting Started

```
mkdir hello-world-react

cd hello-world-react

yarn init
```

### Webpack installation and configuration

```
yarn add webpack webpack-dev-server path

touch webpack.config.js
```

```
/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}
```


### Setting up Babel

```
yarn add babel-loader babel-core babel-preset-es2015 babel-preset-react --dev

touch .babelrc
```

```
/*
    ./.babelrc
*/  
{
    "presets":[
        "es2015", "react"
    ]
}
```

### Setting up our React Components

```
|-- node_modules
|-- .babelrc
|-- package.json
|-- webpack.config.js
|-- yarn.lock
```

> Its high time we add the React side don't you think? We'll create a new folder client and add an index.js file and an index.html file.

```
mkdir client
cd client
touch index.js
touch index.html
cd ..
```

> Open up index.js and add:

```
/*
    ./client/index.js
    which is the webpack entry file
*/
console.log('Hey guys and ladies!!')
```
> Update index.html to:

```
/*
    ./client/index.html
    basic html skeleton
*/
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React App Setup</title>
  </head>
  <body>
    <div id="root">

    </div>
  </body>
</html>
```

### Html-Webpack-Plugin

```
yarn add html-webpack-plugin
```

> edit webpack.config.js

```
/*
    ./webpack.config.js
*/
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {

...

module: {
    loaders: [
        ...
    ]
},
// add this line
plugins: [HtmlWebpackPluginConfig]
}
```

### Run it!

> package.json

```
/*
    ./package.json
*/
{
  "name": "hello-world-react",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",

  // add the scripts key to your package.json

  "scripts": {
    "start": "webpack-dev-server"
  },

  "dependencies": {
  ...
  },
  "devDependencies": {
  ...
  }
}
```

#### Go to our terminal and run:

```
yarn start
```

> Open your browser on http://localhost:8080/. Check your console you'll see our message

### React

```
yarn add react react-dom
```

and

```
cd client
mkdir components
cd components
touch App.jsx
cd ../..
```

#### our file structure

```
|-- client
     |-- components
         |-- App.jsx
     |-- index.html
     |-- index.js
|-- .babelrc
|-- package.json
|-- webpack.config.js
|-- yarn.lock
```

#### Next let's update the App.jsx file

```
/*
    ./client/components/App.jsx
*/
import React from 'react';

export default class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello World</h1>
      </div>);
  }
}
```

#### Let's replace the console.log() with:

```
/*
    ./client/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(<App />, document.getElementById('root'));
```

> Open bash and start our project

```
yarn start
```

### Redux Getting Started

```
git checkout master
git pull
git checkout -b feature/Redux
```
and

```
yarn add redux
```

> Most likely, you'll also need the React bindings and the developer tools.

```
yarn add react-redux
yarn add redux-devtools --dev
```

#### Full-fledged Redux application with a React.js front-end (React is not required), this base. Go to client/index.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
```

> function reducer( State , Action ) ⇒ State

> Takes the previous state and an action, and returns the next state.

> Splitting your app into multiple reducers (greetingsReducer, nameReducer) allows for a clean separation of concerns when modifying your application's state.

```
const greetingReducer = (state='' , action) => {
  switch (action.type) {
    case 'SAY_HELLO': return 'Hello '
    case 'SAY_GOODBYE': return 'Goodbye '
  }
  return state
}

const nameReducer = (state='John', action) => {
  switch (action.type) {
    case 'CHANGE_NAME': return 'Joel'
  }
  return state
}
```

> function middleware( {Dispatch, getState} ) ⇒ next ⇒ action

> Receives Store’s dispatch and getState functions as named arguments, and
returns a function. That function will be given the next middleware’s dispatch method,
and is expected to return a function of action calling next(action) with a potentially
different argument, or at a different time, or maybe not calling it at all. The last
middleware in the chain will receive the real store’s dispatch method as the next
parameter, thus ending the chain.

```
const actionLogger = ({dispatch, getState}) =>
  (next) => (action) =>
    { console.log(action); return next(action) }
```

> combineReducers( {Reducers} ) ⇒ Function

> Combines multiple reducers into a single reducing function with each reducer as a
key/value pair. Can then be passed to createStore().

```
const reducers = combineReducers({
  greeting: greetingReducer,
  name: nameReducer
})
```

> applyMiddleware( ...middleWares ) ⇒ Function

```
const middleware = applyMiddleware(actionLogger)
```

> createStore( Reducer , ?initialState , ?enhancer ) ⇒ Store

> store = { ... }

> Brings together your application's state and has the following responsibilities:

```
Allows access to state via getState();
• Allows state to be updated via dispatch(action);
• Registers listeners via subscribe(listener);
• Handles unregistering of listeners via the function returned by subscribe(listener).
```

```
const store = createStore(
  reducers,
  { greeting: '(Roll over me) '},
  middleware
)
```

> action = { type: String, ...payload: any }
> Holds action payloads in plain javascript objects. Must have a type property that
indicates the performed action, typically be defined as string constants. All other
properties are the action's payload.
> function actionCreator( ?any ) ⇒ Action|AsyncAction
> Creates an action with optional payload and bound dispatch.

```
const changeName = () => {return { type: 'CHANGE_NAME' }}
const hello = () => {return { type: 'SAY_HELLO' }}
const goodbye = () => {return { type: 'SAY_GOODBYE' }}

const Hello = (props) =>
  <div
    onMouseOver={props.hello}
    onMouseOut={props.goodbye}
    onClick={props.changeName}>
    {props.greeting}{props.name}
  </div>
```

> bindActionCreators( ActionCreators , Dispatch ) ⇒ Fn | Obj
> Turns an object whose values are action creators, into an object with the same keys,
but with every action creator wrapped into a dispatch call so they may be invoked
directly

```
const render = () => {
  ReactDOM.render(
    <Hello
      greeting={store.getState().greeting}
      name={store.getState().name}
      {...bindActionCreators({changeName, hello, goodbye},
      store.dispatch)}
    />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
```

```
yarn start
```

```
...
git commit -m "[1] feature(redux) Redux base example"
git push origin +feature/Redux

...

git push origin feature/Redux
git pull origin feature/Redux

...

git checkout master
git pull
```

### Redux-saga Getting Started

```
git checkout master
git pull
git checkout -b feature/Saga
```


```
yarn add redux-saga
yarn add prop-types
yarn add babel-polyfill
```

> create components/Counter
> create reducers
> index update

```
touch Counter
```

```
touch reducers
```

```
touch sagas.js
```

> ...
