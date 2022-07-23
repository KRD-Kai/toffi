import type { NextApiRequest, NextApiResponse } from "next";

export default async function requestHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.query);
    const { collectionAddr, tokenId } = req.query;
    // const response = await fetch(
    //     `https://api.covalenthq.com/v1/1/nft_market/collection/${collectionAddr}/token_id/${tokenId}/sales/?key=${process.env.COVALENT_APIKEY}?chain=polygon`
    // );
    const response = await fetch(
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
    const resBody = await response.json();
    res.status(response.status).json(resBody);
}
