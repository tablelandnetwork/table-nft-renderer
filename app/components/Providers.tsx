import React from 'react';
import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { BrowserRouter} from 'react-router-dom';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.arbitrumGoerli, chain.goerli],
  [
    publicProvider()
  ]
);


const { connectors } = getDefaultWallets({
  appName: 'Tableland Table NFT',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function ProvidersComponent(props) {

  return (
    <BrowserRouter>
      <WagmiConfig client={wagmiClient}>
        {/* @ts-ignore */}
        <RainbowKitProvider chains={chains}>
          {props.children}
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  );
};

export default ProvidersComponent;
