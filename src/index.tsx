import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { store } from '@/services';
import i18n from '@/i18n';
import { I18nextProvider } from 'react-i18next';
ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <App />
        </Provider>
    </I18nextProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
