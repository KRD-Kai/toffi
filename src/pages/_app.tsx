import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
    RainbowKitProvider,
    getDefaultWallets,
    darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Layout from "../components/layout/Layout";
import Script from "next/script";
import { db } from "../db";

const { chains, provider, webSocketProvider } = configureChains(
    [
        chain.mainnet,
        chain.polygon,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
            ? [chain.polygonMumbai]
            : []),
    ],
    [
        alchemyProvider({
            // This is Alchemy's default API key.
            // You can get your own at https://dashboard.alchemyapi.io
            alchemyId: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
        }),
        publicProvider(),
    ]
);

const { connectors } = getDefaultWallets({
    appName: "RainbowKit App",
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

function MyApp({ Component, pageProps }: AppProps) {
    let scriptsLoaded = 0;
    function handleScriptLoaded() {
        scriptsLoaded++;
        if (scriptsLoaded == 2) {
            return db.init();
        }
    }
    return (
        <WagmiConfig client={wagmiClient}>
            <Script
                onLoad={handleScriptLoaded}
                id="ipfs-script"
                src="https://unpkg.com/ipfs@0.55.1/dist/index.min.js"
            ></Script>
            <Script
                onLoad={handleScriptLoaded}
                id="orbitdb-script"
                src="https://unpkg.com/orbit-db@0.26.1/dist/orbitdb.min.js"
            ></Script>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default MyApp;
