import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { queryReducer } from "./app/reducers/reducer.js";
import thunkMiddleware from "redux-thunk";
import { QueryContainer } from "./app/components/Query.js";
import config from './config';
import analytics from 'universal-ga';

if (config && config.google_analytics){
  analytics.initialize(config.google_analytics.property_id)
}

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

const Main = React.createClass({
  render: () => {
    return (
      <div>
         <QueryContainer />
      </div>
    )
  }
});

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(queryReducer)}>
    <Main />
  </Provider>,
  document.getElementById("main")
);
