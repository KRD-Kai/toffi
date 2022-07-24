import type { NextApiRequest, NextApiResponse } from "next";

export default async function requestHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { addr, chainId } = req.query;
    let chain: string;
    switch (chainId) {
        case "137":
            chain = "polygon-mainnet";
            break;
        case "80001":
            chain = "polygon-mumbai";
            break;
        default:
            chain = "ethereum-mainnet";
    }
    //Use alchemy for mumbai support
    const response = await fetch(
        `https://${chain}.g.alchemyapi.io/nft/v2/demo/getNFTs/?owner=${addr}`,
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
