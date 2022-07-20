import type { NextPage } from "next";
import Head from "next/head";
import { Hero, Input, Button, InputGroup, Form } from "react-daisyui";

const Explore: NextPage = () => {
    return (
        <>
            <Head>
                <title>Explore - Toffi</title>
            </Head>
            <Hero className="pt-10">
                <Hero.Content className="text-center">
                    <div className="max-w-lg">
                        <h1 className="text-5xl font-bold pb-4">
                            Find and bid on NFTs
                        </h1>
                        <Form>
                            <InputGroup className="justify-center">
                                <Input
                                    type="text"
                                    className="w-full"
                                    placeholder="Search NFT"
                                />
                                <Button>Search</Button>
                            </InputGroup>
                        </Form>
                    </div>
                </Hero.Content>
            </Hero>
        </>
    );
};

export default Explore;
