import type { NextApiRequest, NextApiResponse } from "next";

export default async function requestHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { NFTQuery, chainId } = req.query;
    if (chainId == "80001") {
        const testData = {
            search_results: [
                {
                    chain: "mumbai",
                    contract_address:
                        "0xa07e45a987f19e25176c877d98388878622623fa",
                    token_id: "123",
                    cached_file_url: "",
                    name: "Hackfs demo",
                    description: "Test token for Hackfs demo",
                    mint_date: "",
                },
            ],
        };
        return res.status(200).json(testData);
    }
    const response = await fetch(
        `https://api.nftport.xyz/v0/search?text=${NFTQuery}&chain=all`,
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
