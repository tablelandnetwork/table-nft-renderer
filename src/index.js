import express from "express";
import fetch from 'node-fetch';
import * as tableland from '@tableland/sdk';
const app = express();
global.fetch = fetch;

const port = 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const chains = {
  1:        {name: "Etherum Mainnet",   slug: "ethereum"},
  5:        {name: "Ethereum Goerli",   slug: "ethereum-goerli"},
  69:       {name: "Optimism Kovan",    slug: "optimism-kovan"},
  80001:    {name: "Polygon Mumbai",    slug: "polygon-mumbai" },
  421611:   {name: "Arbitrum Rinkeby",  slug: "arbitrum-rinkeby" }
};

app.use("/:chain_id/:table_id", async (req, res, next) => {
  try {
    let table_data = await fetch(`https://testnet.tableland.network/chain/${req.params.chain_id}/tables/${req.params.table_id}`)
      .then(r => r.json());
    
    const chain = chains[req.params.chain_id];
    if(!chain) throw ("unknown chain");
    let conn = await tableland.connect({
      chain: chain.slug
    });
    let data = await conn.read(`SELECT * FROM ${table_data.name};`);
    res.set("Content-Type", "image/svg+xml");
    let columns = data.columns.map(column=>column.name);
    res.send(`
    <svg class="bg" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <style>
        .bg { background: black }
        .text { 
          font: italic 16px sans-serif; 
          fill: white; 
        }
        .text-small {
          font: italic 12px sans-serif;
        }
        .text-elip {
          font: 80px serif;
        }
        .text-elip:hover {
          fill: grey;
        }
      </style>
      <text x="5" y="20" class="text">${table_data.name}</text>
      <text x="5" y="40" class="text">${chain.name} Chain</text>
      <text x="5" y="60" class="text">${data.rows.length} Rows</text>
      <text x="5" y="80" class="text">${columns.length} columns:</text>
      <text x="19" y="95" class="text text-small">${columns.join(', ')}</text>
      <text y="220" x="90" class="text text-elip">...</text>
    </svg>

    `);
  } catch (e) {
    res.send(`Could not locate table: ${e}`);
  }
});
