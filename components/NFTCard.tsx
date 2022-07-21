import { useState } from "react";
import { Card, Button, Tooltip, Modal } from "react-daisyui";
import BidModal from "./BidModal";

interface NFTData {
    chain: string;
    contract_address: string;
    token_id: string;
    cached_file_url: string;
    name: string;
    description: string;
    mint_date: string;
}

export default function NFTCard({ NFTData }: { NFTData: NFTData }) {
    const [visible, setVisible] = useState<boolean>(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };
    return (
        <>
            <Card className="w-full bg-100 shadow-xl inline-block border">
                <Card.Image
                    style={{ height: "20em" }}
                    src={NFTData.cached_file_url}
                    alt="NFT pic"
                />
                <Card.Body>
                    <Card.Title tag="h2">{NFTData.name}</Card.Title>
                    <Tooltip message={NFTData.description}>
                        <p>{NFTData.description.substring(0, 30)}...</p>
                    </Tooltip>
                    <Card.Actions className="justify-end">
                        <Button color="primary" onClick={toggleVisible}>
                            Bid
                        </Button>
                    </Card.Actions>
                </Card.Body>
            </Card>
            <BidModal
                NFTData={NFTData}
                visible={visible}
                onClickBackdrop={toggleVisible}
            />
        </>
    );
}
