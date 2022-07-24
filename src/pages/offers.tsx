import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Seaport } from "@opensea/seaport-js";
import { useAccount, useNetwork } from "wagmi";
import { ethers } from "ethers";
import { db } from "../db";
import { Offer } from "../db/offer";

const Offers: NextPage = () => {
    const [incomingOffers, setIncomingOffers] = useState<Offer[]>();
    // const [seaport, setSeaport] = useState<Seaport>();
    const { address } = useAccount();
    const { chain } = useNetwork();

    useEffect(() => {
        let seaport: Seaport;
        if (typeof window.ethereum !== "undefined") {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            seaport = new Seaport(provider);
        }
        async function getIncomingOrders() {
            try {
                if (!seaport) return;
                const res = await fetch(
                    `/api/nft/userowned/${address}?chain_id=${chain?.id}`
                );
                const resBody = await res.json();
                const nfts = resBody.ownedNfts;
                for (const nft of nfts) {
                    const tokenId = parseInt(nft.id.tokenId, 16);
                    db.on("ready", async () => {
                        const offers = db.getOffers(
                            `${nft.contract.address}/${tokenId}`
                        );
                        let validOffers: Offer[] = [];
                        for (const offer of offers) {
                            const orderHash = seaport.getOrderHash(
                                offer.parameters
                            );
                            const status = await seaport.getOrderStatus(
                                orderHash
                            );
                            if (
                                status.isCancelled ||
                                status.totalFilled.gt(0) //check if order has been filled
                            ) {
                                return;
                            }
                            validOffers.push(offer);
                        }
                        setIncomingOffers(validOffers);
                    });
                }
            } catch (err: any) {
                console.error(err);
            }
        }
        getIncomingOrders();
    }, [address, chain]);

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
