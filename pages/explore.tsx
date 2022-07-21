import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Input, Button, InputGroup } from "react-daisyui";

const Explore: NextPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    function handleSearchSubmit(e: FormEvent) {
        e.preventDefault();
        alert(searchQuery);
    }
    return (
        <>
            <Head>
                <title>Explore - Toffi</title>
            </Head>
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
        </>
    );
};

export default Explore;
