import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import dotenv from 'dotenv';
import store from './store';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
