import React from "react";
import ReactDOM  from "react-dom/client";
import App from './App';
import { Provider } from 'react-redux';
import {  legacy_createStore as createStore,applyMiddleware } from'redux';
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import "./styles/index.css";
// import {  configureStore } from'redux';
//dev tools
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
   
        <Provider store={store}>
          <App />
        </Provider>,
  );
// import React from "react";
// import ReactDOM  from "react-dom";
// import App from './App';
// import { Provider } from 'react-redux';
// import {  legacy_createStore as createStore,applyMiddleware } from'redux';
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";
// // import {  configureStore } from'redux';
// //dev tools
// import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk, logger))
//   );
  
// ReactDOM.render(
   
//         <Provider store={store}>
//           <App />
//         </Provider>,
//     document.getElementById('root')
//   );
