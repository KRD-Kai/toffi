import type { NextApiRequest, NextApiResponse } from "next";

export default async function requestHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.query);
    const { collectionAddr, tokenId } = req.query;
    const response = await fetch(
        `https://api.covalenthq.com/v1/1/nft_market/collection/${collectionAddr}/token_id/${tokenId}/sales/?key=${process.env.COVALENT_APIKEY}`
    );
    const resBody = await response.json();
    res.status(response.status).json(resBody);
}
