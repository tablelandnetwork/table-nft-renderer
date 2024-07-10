import React, { ReactNode, useState, useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  Chain,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import * as chain from "wagmi/chains";
import { type HttpTransport, http } from "viem";
import dotenv from "dotenv";

dotenv.config();

// All of the chains configured below are supported by Tableland
// @ts-expect-error this is valid; the OP chains cause a type error
const chains: readonly [Chain, ...Chain[]] = [
  chain.mainnet,
  chain.polygon,
  chain.optimism,
  chain.arbitrum,
  chain.base,
  chain.filecoin,
  chain.arbitrumSepolia,
  chain.baseSepolia,
  chain.sepolia,
  chain.polygonAmoy,
  chain.optimismSepolia,
  chain.filecoinCalibration,
] as const;

const transports: Record<number, HttpTransport> = Object.fromEntries(
  chains.map((c) => [c.id, http()])
);

export const config = getDefaultConfig({
  appName: "Tableland Table NFT",
  chains,
  transports,
  projectId: process.env.WALLET_CONNECT_PROJECT_ID ?? "", // Set up a WalletConnect account: https://walletconnect.com/
});

const queryClient = new QueryClient();

function ProvidersComponent({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default ProvidersComponent;
