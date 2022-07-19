import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar, Menu, Button, Dropdown } from "react-daisyui";
import NextLink from "next/link";

const navbar = () => {
    return (
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
                            <Dropdown.Item>
                                <NextLink href="explore">
                                    <a>Explore/Bid</a>
                                </NextLink>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                <NextLink href="list">
                                    <a>List NFT</a>
                                </NextLink>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <a className="btn btn-ghost normal-case text-xl">Toffi</a>
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
                    <ConnectButton chainStatus="icon" accountStatus="address" />
                </Navbar.End>
            </Navbar>
        </div>
    );
};

export default navbar;
