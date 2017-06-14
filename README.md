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
