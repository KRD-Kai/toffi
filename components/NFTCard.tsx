import Image from "next/image";
import { Card, Button, Tooltip } from "react-daisyui";

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
    return (
        <Card className="w-full bg-100 shadow-xl inline-block">
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
                    <Button color="primary">Bid</Button>
                </Card.Actions>
            </Card.Body>
        </Card>
    );
}
