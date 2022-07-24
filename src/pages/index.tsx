import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Hero, Button } from "react-daisyui";
const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Toffi</title>
            </Head>
            <Hero className="pt-20">
                <Hero.Overlay className="bg-transparent" />
                <Hero.Content className="text-center">
                    <div className="max-w-md">
                        <Image
                            src="/logo.png"
                            width={250}
                            height={80}
                            alt="logo"
                        />
                        <p className="py-6">
                            Toffi is a decentralized, universal NFT marketplace
                            orderbook.
                        </p>
                        <Link href="/explore">
                            <Button color="primary">Get Started</Button>
                        </Link>
                    </div>
                </Hero.Content>
            </Hero>
        </>
    );
};

export default Home;
