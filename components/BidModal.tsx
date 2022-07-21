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

            <Modal.Body>Body</Modal.Body>

            <Modal.Actions>
                <Button>Place bid</Button>
            </Modal.Actions>
        </Modal>
    );
}
