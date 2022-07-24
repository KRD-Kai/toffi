import type { NextApiRequest, NextApiResponse } from "next";

export default async function requestHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { collectionAddr, tokenId, chain_id } = req.query;
    let response: any;
    if (chain_id == "137") {
        //If polygon, use Covalent's polygon sale endpoint
        response = await fetch(
            `https://api.covalenthq.com/v1/1/nft_market/collection/${collectionAddr}/token_id/${tokenId}/sales/?key=${process.env.COVALENT_APIKEY}?chain=polygon`
        );
    } else {
        //Otherwise use NFTPort. I seems to have more sales indexed on eth mainnet than covalent
        response = await fetch(
            `
            https://api.nftport.xyz/v0/transactions/nfts/${collectionAddr}/${tokenId}?chain=ethereum&type=sale`,
            {
                method: "GET",
                headers: {
                    Authorization: String(process.env.NFTPORT_APIKEY),
                    "Content-Type": "application/json",
                },
            }
        );
    }
    const resBody = await response.json();
    res.status(response.status).json(resBody);
}
