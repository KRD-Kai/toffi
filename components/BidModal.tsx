import { Modal, Button } from "react-daisyui";

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
    console.log(NFTData.contract_address, NFTData.token_id);
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
            </Modal.Body>

            <Modal.Actions>
                <Button>Place bid</Button>
            </Modal.Actions>
        </Modal>
    );
}
