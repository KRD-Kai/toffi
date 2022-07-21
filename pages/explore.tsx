import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Input, Button, InputGroup } from "react-daisyui";
import NFTSearchResults from "../components/NFTSearchResults";

const Explore: NextPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    async function handleSearchSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        const res = await searchForNFT(searchQuery);
        setIsLoading(false);
        setResponse(res);
    }
    return (
        <>
            <Head>
                <title>Explore - Toffi</title>
            </Head>
            {isLoading && (
                <progress className="progress w-100 p-0 align-top absolute"></progress>
            )}
            <div className="max-w-lg pt-5 text-center m-auto">
                <h1 className="text-4xl font-bold pb-4">
                    Find and bid on NFTs
                </h1>
                <form onSubmit={handleSearchSubmit}>
                    <InputGroup className="justify-center">
                        <Input
                            type="text"
                            className="w-full"
                            placeholder="Search NFT"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button>Search</Button>
                    </InputGroup>
                </form>
            </div>
            {response && (
                <div
                    className="pt-5 gap-3 grid w-full place-items-center"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(400px, 1fr))",
                        alignItems: "stretch",
                    }}
                >
                    <NFTSearchResults res={response} />
                </div>
            )}
        </>
    );
};

async function searchForNFT(NFTQuery: string) {
    const res = await fetch(`/api/search/${NFTQuery}`);
    const resBody = await res.json();
    return resBody;
}

export default Explore;
