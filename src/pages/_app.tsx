import { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { MoralisProvider } from "react-moralis";
import { AppProvider } from "../../context";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import { darkModeTheme, lightModeTheme } from "../contracts/theme";
import "../styles/index.css";
import "../styles/select.css";
import { Theme } from "../utils/theme";

function MyApp({ Component, pageProps }: AppProps) {
    const { hideHeader, publicPage, skipAuth, lightTheme, darkTheme, landing } =
        pageProps;
    console.log({ pageProps });

    return (
        <>
            <NextNProgress height={7} color="var(--secondaryText)" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk&family=VT323&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=VT323&display=swap"
                rel="stylesheet"
            />
            {(pageProps.publicPage || pageProps.customTheme) &&
                darkTheme &&
                lightTheme && (
                    <>
                        <link
                            href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(
                                `${darkTheme.publicPrimaryFont}`
                            )}&family=${encodeURIComponent(
                                `${darkTheme.publicSecondaryFont}`
                            )}&family=${encodeURIComponent(
                                `${lightTheme.publicPrimaryFont}`
                            )}&family=${encodeURIComponent(
                                `${lightTheme.publicSecondaryFont}`
                            )}&display=swap`}
                            rel="stylesheet"
                        />
                    </>
                )}
            <Head>
                <title>Keroverse</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            {!publicPage && !landing && (
                <>
                    <div className="left-gradient" />
                    <div className="right-top-gradient" />
                    <div className="right-middle-gradient" />
                    <div className="right-bottom-gradient" />
                </>
            )}
            {landing && (
                <>
                    {/* <div className="landing-1" />
                    <div className="landing-2" />
                    <div className="landing-3" />
                    <div className="landing-4" /> */}
                </>
            )}
            <MoralisProvider
                appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
                serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
            >
                <AppProvider>
                    <Wrapper skipAuth={skipAuth}>
                        <div className="text-primaryText bg-primaryBackground font-satoshi z-10 font-light">
                            {!hideHeader && <Header />}
                            <div
                                className={`${
                                    !hideHeader
                                        ? " dasboard-container px-4 py-12 md:px-4 lg:px-20 xl:px-56 2xl:px-80 overflow-y-auto mx-auto"
                                        : " min-h-screen "
                                } `}
                            >
                                <Component {...pageProps} />
                            </div>
                        </div>
                    </Wrapper>
                </AppProvider>
            </MoralisProvider>
        </>
    );
}

export default MyApp;
