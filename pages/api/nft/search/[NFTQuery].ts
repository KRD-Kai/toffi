import type { NextApiRequest, NextApiResponse } from "next";

export default async function requestHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { NFTQuery } = req.query;
    const response = await fetch(
        `https://api.nftport.xyz/v0/search?text=${NFTQuery}&chain=ethereum`,
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
