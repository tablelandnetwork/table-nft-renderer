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
import { alchemyProvider } from "wagmi/providers/alchemy";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.arbitrumGoerli, chain.goerli],
  [
    alchemyProvider({ apiKey: 'kr5ki0tWRpzZJ49YoxQSXNtaj94fdbna' }),
    publicProvider(),
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
    <Provider store={store}>
      <BrowserRouter>
        <WagmiConfig client={wagmiClient}>
          {/* @ts-ignore */}
          <RainbowKitProvider chains={chains}>
            {props.children}
          </RainbowKitProvider>
        </WagmiConfig>
      </BrowserRouter>
    </Provider>
  );
};

export default ProvidersComponent;
