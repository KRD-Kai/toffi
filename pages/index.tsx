import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Niftii</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ConnectButton />
        </>
    );
};

export default Home;
