import React from 'react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, createStorage, WagmiConfig, } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import inIframe from '../lib/inIframe';
var _a = configureChains([chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.arbitrumGoerli, chain.goerli], [
    // alchemyProvider({ apiKey: 'kr5ki0tWRpzZJ49YoxQSXNtaj94fdbna' }),
    publicProvider(),
]), chains = _a.chains, provider = _a.provider;
var connectors = getDefaultWallets({
    appName: 'Tableland Table NFT',
    chains: chains
}).connectors;
var wagmiClient = createClient({
    // autoConnect: true,
    connectors: connectors,
    provider: provider,
    storage: createStorage({
        storage: {
            getItem: function () { return null; },
            setItem: function () { },
            removeItem: function () { }
        }
    })
});
function ProvidersComponent(props) {
    var app = inIframe() ? (props.children) : (React.createElement(RainbowKitProvider, { chains: chains }, props.children));
    return (React.createElement(Provider, { store: store },
        React.createElement(BrowserRouter, null,
            React.createElement(WagmiConfig, { client: wagmiClient }, app))));
}
;
export default ProvidersComponent;
