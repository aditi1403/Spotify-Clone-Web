import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DataLayer } from './DataLayer';

import * as reportWebVitals from './reportWebVitals'
import reducer, { initialState } from './reducer';

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals();
