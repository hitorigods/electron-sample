import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import Head from './Head';
import App from './App';
import './assets/font/SFMono/SFMono.scss';
import '@fontsource-variable/noto-sans-jp';
import './main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Head />
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
