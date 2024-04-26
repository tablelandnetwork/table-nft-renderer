import React from "react";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  createStorage,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";

const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.arbitrumGoerli,
    chain.goerli,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Tableland Table NFT",
  chains,
});

const wagmiClient = createClient({
  // autoConnect: true,
  connectors,
  provider,
  storage: createStorage({
    storage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    },
  }),
});

function ProvidersComponent(props) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <WagmiConfig client={wagmiClient}>
          {/* @ts-ignore */}
          {props.children}
        </WagmiConfig>
      </BrowserRouter>
    </Provider>
  );
}

export default ProvidersComponent;
