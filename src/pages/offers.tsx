import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Seaport } from "@opensea/seaport-js";

const Offers: NextPage = () => {
    const [incomingOffers, setIncomingOffers] = useState();
    const [seaport, setSeaport] = useState<Seaport>();

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            let seaport: Seaport = new Seaport(provider);
            setSeaport(seaport);
        }
    }, []);

    async function getIncomingOrders() {
        if (!seaport) return;
    }

    return (
        <>
            <Head>
                <title>Offers - Toffi</title>
            </Head>
            Offers
        </>
    );
};

export default Offers;
