import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Seaport } from "@opensea/seaport-js";
import { useAccount, useNetwork } from "wagmi";
import { ethers } from "ethers";
import { db } from "../db";
import { Offer } from "../db/offer";
import { toast } from "react-toastify";
import { Table, Button, Mask, Alert, Badge } from "react-daisyui";
import tokens from "../tokens.json";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Offers: NextPage = () => {
    const [incomingOffers, setIncomingOffers] = useState<Offer[]>([]);
    const [seaport, setSeaport] = useState<Seaport>();
    const [isOffersLoading, setIsOffersLoading] = useState(false);
    const { address } = useAccount();
    const { chain } = useNetwork();
    db.on("offersUpdated", getIncomingOrders);

    useEffect(() => {
        if (!address) return;
        let seaport: Seaport;
        if (typeof window.ethereum !== "undefined") {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            seaport = new Seaport(provider);
            setSeaport(seaport);
        }
        async function getIncomingOrders() {
            setIsOffersLoading(true);
            try {
                if (!seaport) return;
                const res = await fetch(
                    `/api/nft/userowned/${address}?chain_id=${chain?.id}`
                );
                const resBody = await res.json();
                const nfts = resBody.ownedNfts;
                if (!nfts.length) {
                    setIncomingOffers([]);
                    setIsOffersLoading(false);
                    return;
                }
                let validOffers: Offer[] = [];
                const setValidOffers = async () => {
                    for (const nft of nfts) {
                        const tokenId = parseInt(nft.id.tokenId, 16);

                        const offers = db.getOffers(
                            `${nft.contract.address}/${tokenId}`
                        );
                        if (!offers?.length) {
                            continue;
                        }
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
                                continue;
                            }
                            validOffers.push(offer);
                        }
                    }
                    setIncomingOffers(validOffers);
                    setIsOffersLoading(false);
                };
                if (db.initialized) {
                    await setValidOffers();
                } else {
                    db.on("ready", setValidOffers);
                }
            } catch (err: any) {
                toast.error("Error getting offers");
                setIsOffersLoading(false);
            }
        }
        getIncomingOrders();
    }, [address, chain]);

    if (!address) {
        return (
            <div className="pt-10">
                <Alert
                    style={{ maxWidth: "30em", margin: "auto" }}
                    className="m-10"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 mx-2 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    }
                    status="info"
                >
                    <div className="w-2/4">
                        <ConnectButton />
                    </div>
                    Login to see incoming offers on your NFTs!
                </Alert>
            </div>
        );
    }

    async function getIncomingOrders() {
        setIsOffersLoading(true);
        try {
            if (!seaport) return;
            const res = await fetch(
                `/api/nft/userowned/${address}?chain_id=${chain?.id}`
            );
            const resBody = await res.json();
            const nfts = resBody.ownedNfts;
            if (!nfts.length) {
                setIncomingOffers([]);
                setIsOffersLoading(false);
                return;
            }
            let validOffers: Offer[] = [];
            const setValidOffers = async () => {
                for (const nft of nfts) {
                    const tokenId = parseInt(nft.id.tokenId, 16);

                    const offers = db.getOffers(
                        `${nft.contract.address}/${tokenId}`
                    );
                    if (!offers?.length) {
                        continue;
                    }
                    for (const offer of offers) {
                        const orderHash = seaport.getOrderHash(
                            offer.parameters
                        );
                        const status = await seaport.getOrderStatus(orderHash);
                        if (
                            status.isCancelled ||
                            status.totalFilled.gt(0) //check if order has been filled
                        ) {
                            continue;
                        }
                        validOffers.push(offer);
                    }
                }
                setIncomingOffers(validOffers);
                setIsOffersLoading(false);
            };
            if (db.initialized) {
                await setValidOffers();
            } else {
                db.on("ready", setValidOffers);
            }
        } catch (err: any) {
            toast.error("Error getting offers");
            setIsOffersLoading(false);
        }
    }
    async function acceptBidOffer(offer: Offer) {
        if (!seaport) return;
        const order: OrderWithCounter = {
            parameters: offer.parameters,
            signature: offer.signature,
        };
        try {
            const { executeAllActions: executeAllFulfillActions } =
                await seaport.fulfillOrder({
                    order,
                    accountAddress: address,
                });

            const transaction = await executeAllFulfillActions();
            await toast.promise(transaction.wait, {
                pending: "Transaction pending",
                success: "Transaction confired",
                error: {
                    render({ data }) {
                        return `Transaction failed: ${data.message}`;
                    },
                },
            });
            getIncomingOrders();
        } catch (err: any) {
            console.error(err);
        }
    }
    return (
        <>
            <Head>
                <title>Offers - Toffi</title>
            </Head>
            {isOffersLoading && (
                <progress className="progress w-100 p-0 align-top absolute"></progress>
            )}
            <div className="overflow-x-auto pt-5 text-center">
                {incomingOffers.length !== 0 ? (
                    <>
                        <h1 className="text-2xl font-bold pb-1">
                            Incoming offers:
                        </h1>
                        <Table className="rounded-box m-auto">
                            <Table.Head>
                                <span>NFT</span>
                                <span>Offer</span>
                                <span>Bidder</span>
                                <span>Created</span>
                                <span />
                            </Table.Head>

                            <Table.Body>
                                {incomingOffers
                                    .slice(0)
                                    .reverse()
                                    .map((offer, i) => (
                                        <Table.Row key={i}>
                                            <div className="flex items-center space-x-3 truncate relative">
                                                <Mask
                                                    variant="squircle"
                                                    src="https://via.placeholder.com/1000/252b3a/c?text=No+image"
                                                    style={{ maxHeight: "5em" }}
                                                />
                                                <div>
                                                    <div className="font-bold">
                                                        {offer.parameters.consideration[0].token.substring(
                                                            0,
                                                            5
                                                        )}
                                                        ...
                                                        {offer.parameters.offerer.slice(
                                                            -3
                                                        )}
                                                    </div>
                                                    <div className="text-sm opacity-50">
                                                        #
                                                        {
                                                            offer.parameters
                                                                .consideration[0]
                                                                .identifierOrCriteria
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {ethers.utils.formatUnits(
                                                    offer.parameters.offer[0]
                                                        .startAmount,
                                                    offer.tokenDecimals
                                                )}{" "}
                                                {
                                                    // @ts-ignore
                                                    tokens[
                                                        offer.parameters.offer[0].token.toLowerCase()
                                                    ].symbol
                                                }
                                                <br />
                                                <Badge color="ghost" size="sm">
                                                    {offer.market}
                                                </Badge>
                                            </div>
                                            <div>
                                                {offer.parameters.offerer.substring(
                                                    0,
                                                    5
                                                )}
                                                ...
                                                {offer.parameters.offerer.slice(
                                                    -3
                                                )}
                                            </div>
                                            <div>
                                                {new Date(
                                                    Number(
                                                        offer.parameters.startTime.toString()
                                                    ) * 1000
                                                ).toDateString()}
                                            </div>
                                            <Button
                                                onClick={() =>
                                                    acceptBidOffer(offer)
                                                }
                                            >
                                                Accept
                                            </Button>
                                        </Table.Row>
                                    ))}
                            </Table.Body>
                        </Table>
                    </>
                ) : (
                    !isOffersLoading && "No offers"
                )}
            </div>
        </>
    );
};

export default Offers;
