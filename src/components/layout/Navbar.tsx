import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar, Menu, Button, Dropdown } from "react-daisyui";
import NextLink from "next/link";
import Image from "next/image";

const navbar = () => {
    return (
        <>
            <div className="flex w-full component-preview items-center justify-center gap-2 font-sans">
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
                                <NextLink href="explore">
                                    <Dropdown.Item>Explore/Bid</Dropdown.Item>
                                </NextLink>
                                <NextLink href="list">
                                    <Dropdown.Item>List NFT</Dropdown.Item>
                                </NextLink>
                            </Dropdown.Menu>
                        </Dropdown>
                        <NextLink href="/">
                            <a className="btn btn-link relative w-20 p-100">
                                <Image
                                    width="90"
                                    height="90"
                                    layout="fill"
                                    objectFit="contain"
                                    src="/logo.png"
                                    alt="hi"
                                />
                            </a>
                        </NextLink>
                    </Navbar.Start>
                    <Navbar.Center className="hidden lg:flex">
                        <Menu horizontal className="p-0">
                            <Menu.Item>
                                <NextLink href="explore">
                                    <a>Explore/Bid</a>
                                </NextLink>
                            </Menu.Item>
                            <Menu.Item>
                                <NextLink href="list">
                                    <a>List NFT</a>
                                </NextLink>
                            </Menu.Item>
                        </Menu>
                    </Navbar.Center>
                    <Navbar.End className="overflow-hidden">
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

export default navbar;
