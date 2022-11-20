import { connect, SUPPORTED_CHAINS } from '@tableland/sdk';
import { ChainName } from '@tableland/sdk';
const supportedChains = Object.entries(SUPPORTED_CHAINS);

export var tablelandConnection = connect({});

export function getTablelandConnection() {
  return tablelandConnection;
}

export async function startTableLand(provider) {


  const chainId = (await provider.getNetwork()).chainId;

  const supportedChains = Object.entries(SUPPORTED_CHAINS);

  let currentChain = supportedChains.find(chain => chain[1].chainId === chainId);
  
  const tbl = await connect({
    chain: currentChain[0] as ChainName
  });

  tablelandConnection = tbl;
  
  return tbl;
}
