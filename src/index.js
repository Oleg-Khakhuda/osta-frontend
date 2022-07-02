import React from 'react';
import ReactDOM from 'react-dom/client';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={null}> */}
        <Router>
          <App />
        </Router>
      {/* </PersistGate> */}
    </Provider>

);

