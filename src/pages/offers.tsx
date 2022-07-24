import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Seaport } from "@opensea/seaport-js";
import { useAccount, useNetwork } from "wagmi";
import { ethers } from "ethers";
import { db } from "../db";
import { Offer } from "../db/offer";
import { toast } from "react-toastify";

const Offers: NextPage = () => {
    const [incomingOffers, setIncomingOffers] = useState<Offer[]>();
    const [seaport, setSeaport] = useState<Seaport>();
    const [isLoading, setIsLoading] = useState(false);
    const { address } = useAccount();
    const { chain } = useNetwork();

    useEffect(() => {
        let seaport: Seaport;
        if (typeof window.ethereum !== "undefined") {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            seaport = new Seaport(provider);
            setSeaport(seaport);
        }
        async function getIncomingOrders() {
            setIsLoading(true);
            try {
                if (!seaport) return;
                const res = await fetch(
                    `/api/nft/userowned/${address}?chain_id=${chain?.id}`
                );
                const resBody = await res.json();
                const nfts = resBody.ownedNfts;
                for (const nft of nfts) {
                    const tokenId = parseInt(nft.id.tokenId, 16);
                    const setValidOffers = async () => {
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
                        setIsLoading(false);
                    };
                    if (db.initialized) return await setValidOffers();
                    db.on("ready", setValidOffers);
                }
            } catch (err: any) {
                toast.error("Error getting offers");
                setIsLoading(false);
            }
        }
        getIncomingOrders();
    }, [address, chain]);

    return (
        <>
            <Head>
                <title>Offers - Toffi</title>
            </Head>
            {isLoading && (
                <progress className="progress w-100 p-0 align-top absolute"></progress>
            )}
            Offers
        </>
    );
};

export default Offers;
