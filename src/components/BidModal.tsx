import { useEffect, useState, FormEvent } from "react";
import { Modal, Button, InputGroup, Input, Select } from "react-daisyui";
import { useAccount, useProvider, useSigner } from "wagmi";
import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "ethers";
interface NFTData {
    chain: string;
    contract_address: string;
    token_id: string;
    cached_file_url: string;
    name: string;
    description: string;
    mint_date: string;
}

export default function BidModal({
    NFTData,
    visible,
    onClickBackdrop,
}: {
    NFTData: NFTData;
    visible: boolean;
    onClickBackdrop: any;
}) {
    const [saleRes, setSaleRes] = useState<any>(null);
    const { address } = useAccount();
    const [seaport, setSeaport] = useState<any>(null);

    useEffect(() => {
        fetch(
            `api/nft/lastsale/${NFTData.contract_address}/${NFTData.token_id}`
        ).then(async (res) => {
            const body = await res.json();
            setSaleRes(body);
        });
        if (typeof window.ethereum !== "undefined") {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            let seaport: any = new Seaport(provider);
            setSeaport(seaport);
        }
    }, [NFTData]);

    const [bidValue, setBidValue] = useState("");
    async function handleBidSubmit(e: FormEvent) {
        e.preventDefault();
    }

    async function createBid() {
        const { executeAllActions } = await seaport.createOrder(
            {
                offer: [
                    {
                        amount: 1, //'parseEther("0.00000001").toString()',
                        // USDC
                        // token: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                        token: "0xe11A86849d99F524cAC3E7A0Ec1241828e332C62",
                    },
                ],
                consideration: [
                    {
                        itemType: ItemType.ERC721,
                        token: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
                        identifier: "1",
                        recipient: address,
                    },
                ],
            },
            address
        );
        const order = await executeAllActions();
        console.log("Order:", order);
    }

    return (
        <Modal onClickBackdrop={onClickBackdrop} open={visible}>
            <Modal.Header className="font-bold">
                Place bid on {NFTData.name}
            </Modal.Header>

            <div className="divider h-0"></div>

            <Modal.Body>
                <div>
                    Address:{" "}
                    <a
                        className="link link-accent"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://etherscan.io/address/${NFTData.contract_address}`}
                    >
                        {NFTData.contract_address.substring(0, 6)}...
                        {NFTData.contract_address.slice(-3)}
                    </a>
                </div>
                <div>
                    Token ID:{" "}
                    <a
                        className="link link-accent"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://etherscan.io/token/${NFTData.contract_address}?a=${NFTData.token_id}`}
                    >
                        {NFTData.token_id.length > 8 ? (
                            <>
                                {" "}
                                {NFTData.token_id.substring(0, 3)}...
                                {NFTData.token_id.slice(-3)}
                            </>
                        ) : (
                            NFTData.token_id
                        )}
                    </a>
                </div>
                <div>
                    Last sale:{" "}
                    {saleRes?.transactions
                        ? `${saleRes.transactions[0]?.price_details.price} ${
                              saleRes.transactions[0]?.price_details
                                  .contract_address ==
                              "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
                                  ? "USDC"
                                  : "ETH"
                          }`
                        : "----"}
                </div>
            </Modal.Body>

            <Modal.Actions>
                <form onSubmit={handleBidSubmit}>
                    <InputGroup className="justify-center">
                        <Select required>
                            <Select.Option value={undefined} disabled selected>
                                Choose Marketplace
                            </Select.Option>
                            <Select.Option value={"seaport"}>
                                Opensea/Seaport
                            </Select.Option>
                        </Select>
                        <Input
                            type="text"
                            required
                            placeholder="ETH"
                            className="text-xl w-full"
                            onChange={(e) => setBidValue(e.target.value)}
                        />
                        {address ? (
                            <Button onClick={createBid}>Place bid</Button>
                        ) : (
                            <Button disabled>Connect wallet</Button>
                        )}
                    </InputGroup>
                </form>
            </Modal.Actions>
        </Modal>
    );
}