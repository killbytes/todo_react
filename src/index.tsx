import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root')!); // ! - ts не вернёт null или undefined
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
