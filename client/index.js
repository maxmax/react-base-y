import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
import App from './components/App.jsx';

//function reducer( State , Action ) ⇒ State
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

//function middleware( {Dispatch, getState} ) ⇒ next ⇒ action
const actionLogger = ({dispatch, getState}) =>
  (next) => (action) =>
    { console.log(action); return next(action) }

//combineReducers( {Reducers} ) ⇒ Function
const reducers = combineReducers({
  greeting: greetingReducer,
  name: nameReducer
})

//applyMiddleware( ...middleWares ) ⇒ Function
const middleware = applyMiddleware(actionLogger)

//createStore( Reducer , ?initialState , ?enhancer ) ⇒ Store
const store = createStore(
  reducers,
  { greeting: '(Roll over me) '},
  middleware
)

//action = { type: String, ...payload: any }
//function actionCreator( ?any ) ⇒ Action|AsyncAction
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

//> bindActionCreators( ActionCreators , Dispatch ) ⇒ Fn | Obj
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
