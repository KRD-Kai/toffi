import { useEffect, useState, FormEvent } from "react";
import { Modal, Button, InputGroup, Input } from "react-daisyui";

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
    useEffect(() => {
        fetch(
            `api/nft/lastsale/${NFTData.contract_address}/${NFTData.token_id}`
        ).then(async (res) => {
            const body = await res.json();
            setSaleRes(body);
        });
    }, [NFTData]);

    const [bidValue, setBidValue] = useState("");
    async function handleBidSubmit(e: FormEvent) {
        e.preventDefault();
        alert(bidValue);
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
                        <Input
                            type="text"
                            className="w-full"
                            placeholder="ETH"
                            onChange={(e) => setBidValue(e.target.value)}
                        />
                        <Button>Place bid</Button>
                    </InputGroup>
                </form>
            </Modal.Actions>
        </Modal>
    );
}
