import { connect, SUPPORTED_CHAINS } from '@tableland/sdk';
import { ChainName } from '@tableland/sdk';
const supportedChains = Object.entries(SUPPORTED_CHAINS);



export var tablelandConnection = connect({
  host: "https://testnets.tableland.network"
});

export function getTablelandConnection() {
  return tablelandConnection;
}

import chains from '../../lib/chains.js';

export async function startTableLand(provider, signer, chain="1") {


  const chainId = parseInt(chain);

  const network = (chains[chainId]===undefined || chains[chainId]?.mainnet) ? "" : "testnets.";

  const supportedChains = Object.entries(SUPPORTED_CHAINS);


  let currentChain = supportedChains.find(chain => chain[1].chainId === chainId);
  
  const tbl = await connect({
    host: `https://${network}tableland.network`,
    chain: currentChain?.[0] as ChainName,
    signer: signer
  });

  tablelandConnection = tbl;
  
  return tbl;
}
