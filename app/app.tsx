import React from 'react';
import reactDom from 'react-dom/client';
import init from "@tableland/sqlparser";
import App from './components/Renderer';

import inIframe from './lib/inIframe';


document.addEventListener("DOMContentLoaded", async () => {
  await init();
  reactDom
    .createRoot(document.getElementById("app"))
    .render(
      (
        <App />
      )
    );
});
