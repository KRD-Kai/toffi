import { Link } from "react-daisyui";

export default function Footer() {
    return (
        <footer className="footer footer-center p-4 text-base-content">
            <div>
                <p>
                    <Link
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://twitter.com/krd_fy"
                    >
                        Twitter
                    </Link>{" "}
                    |{" "}
                    <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/KRD-Kai/toffi"
                    >
                        Github
                    </Link>{" "}
                    |{" "}
                    <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://ethglobal.com/showcase/toffi-bid-ggeqc"
                    >
                        Showcase
                    </Link>
                </p>
            </div>
        </footer>
    );
}
