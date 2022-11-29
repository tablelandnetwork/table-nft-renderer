import React from 'react';
import reactDom from 'react-dom/client';

function App(props) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const chain = urlParams.get("chain");
  const id = urlParams.get("id");

  const url = `https://render.tableland.xyz/${chain}/${id}`;

  return <img src={url} />
}

document.addEventListener("DOMContentLoaded", () => {
  reactDom
    .createRoot(document.getElementById("app"))
    .render(
      (
        <App />
      )
    );
});
