import type { NextApiRequest, NextApiResponse } from "next";

export default async function requestHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { addr, chain_id } = req.query;
    let chain: string;
    console.log(chain_id);
    switch (chain_id) {
        case "137":
            chain = "polygon-mainnet";
            break;
        case "80001":
            chain = "polygon-mumbai.g";
            break;
        default:
            chain = "eth-mainnet";
    }
    console.log(chain);
    //Use alchemy for mumbai support
    const response = await fetch(
        `https://${chain}.alchemyapi.io/nft/v2/demo/getNFTs/?owner=${addr}`,
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
