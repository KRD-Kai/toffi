import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className="flex flex-col h-screen">
            <header>
                <Navbar />
            </header>
            <main className="flex-grow">{children}</main>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default Layout;
