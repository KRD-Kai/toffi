import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { Navbar, Menu, Button, Dropdown } from "react-daisyui";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Toffi</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Responsive Navbar */}
            <div className="pb-40 flex w-full component-preview items-center justify-center gap-2 font-sans">
                <Navbar className="bg-base-100 shadow-lg rounded-box">
                    <Navbar.Start>
                        <Dropdown>
                            <Button
                                color="ghost"
                                tabIndex={0}
                                className="lg:hidden"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </Button>
                            <Dropdown.Menu
                                tabIndex={0}
                                className="w-52 menu-compact mt-3"
                            >
                                <Dropdown.Item>Item 1</Dropdown.Item>
                                <li tabIndex={0}>
                                    <a className="justify-between">
                                        Parent
                                        <svg
                                            className="fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                        </svg>
                                    </a>
                                    <ul className="p-2 bg-base-100">
                                        <li>
                                            <a>Submenu 1</a>
                                        </li>
                                        <li>
                                            <a>Submenu 2</a>
                                        </li>
                                    </ul>
                                </li>
                                <Dropdown.Item>Item 3</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <a className="btn btn-ghost normal-case text-xl">
                            Toffi
                        </a>
                    </Navbar.Start>
                    <Navbar.Center className="hidden lg:flex">
                        <Menu horizontal className="p-0">
                            <Menu.Item>
                                <a>Explore</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a>List</a>
                            </Menu.Item>
                        </Menu>
                    </Navbar.Center>
                    <Navbar.End>
                        <ConnectButton
                            chainStatus="icon"
                            accountStatus="address"
                        />
                    </Navbar.End>
                </Navbar>
            </div>
        </>
    );
};

export default Home;
