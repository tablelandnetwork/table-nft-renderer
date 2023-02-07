import React from 'react';
import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  createStorage,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import inIframe from '../lib/inIframe';


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.arbitrumGoerli, chain.goerli],
  [
    // alchemyProvider({ apiKey: 'kr5ki0tWRpzZJ49YoxQSXNtaj94fdbna' }),
    publicProvider(),
  ]
);


const { connectors } = getDefaultWallets({
  appName: 'Tableland Table NFT',
  chains
});


const wagmiClient = createClient({
  // autoConnect: true,
  connectors,
  provider,
  storage: createStorage({
    storage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    }
  })
});


function ProvidersComponent(props) {

  let app = inIframe() ? (
    props.children
  ) : (
    <RainbowKitProvider chains={chains}>
     {props.children}
    </RainbowKitProvider>
  );

  return (
    <Provider store={store}>
      <BrowserRouter>
        <WagmiConfig client={wagmiClient}>
          {/* @ts-ignore */}
          {app}
        </WagmiConfig>
      </BrowserRouter>
    </Provider>
  );
};

export default ProvidersComponent;
