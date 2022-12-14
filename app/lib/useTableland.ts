import { connect, SUPPORTED_CHAINS } from '@tableland/sdk';
import { ChainName } from '@tableland/sdk';
const supportedChains = Object.entries(SUPPORTED_CHAINS);

export var tablelandConnection = connect({
  host: "https://testnet.tableland.network"
});

export function getTablelandConnection() {
  return tablelandConnection;
}

export async function startTableLand(provider, signer) {


  const chainId = (await provider.getNetwork()).chainId;

  const supportedChains = Object.entries(SUPPORTED_CHAINS);


  let currentChain = supportedChains.find(chain => chain[1].chainId === chainId);
  
  const tbl = await connect({
    host: "https://testnet.tableland.network",
    chain: currentChain[0] as ChainName,
    signer: signer
  });

  tablelandConnection = tbl;
  
  return tbl;
}
