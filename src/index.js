import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Redux Store
import store from './redux/store';

// import Provider
import {Provider} from 'react-redux';

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));