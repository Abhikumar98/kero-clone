import { ArrowRightIcon } from "@heroicons/react/outline";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { routes } from "../../utils/routes";
import Button from "../Button";
import Modal from "../Modal";
import CollectionCard from "./CollectionCard";
import FeatureCard from "./FeatureCard";
import HowItWorksStep from "./HowItWorksStep";
import LandingCard from "./LandingCard";

const LandingPageContent = () => {
    const [isKerobotPackage, setIsKerobotPackage] = React.useState(true);
    const [open, setOpen] = useState(false);
    const [payouts, setPayouts] = useState<
        {
            name: string;
            secondary_text: string;
            inner_date: string;
            date: string;
        }[]
    >([]);
    const [collections, setCollections] = useState<
        {
            name: string;
            price: number;
            supply: number;
            mint_date: string;
            logo: string;
            url: string;
        }[]
    >([]);

    const howItWorks = [
        {
            title: "GENERATE COLLECTION",
            description:
                "Enter Project Details, Upload Attributes, Set Rarity and Generate your Collection with Metadata.",
        },
        {
            title: "APPLY TO KEROVERSE INCUPAD",
            description:
                "Fill out the Launch Application Form (with KYC of Core Members to privately dox with Team Keroverse).",
        },
        {
            title: "CUSTOMIZE YOUR MINT",
            description:
                "Once application is approved and the documents have been verified by the team, creators can create their own landing page or setup an existing one before customizing the mint procedure.",
        },
        {
            title: "LAUNCH YOUR COLLECTION",
            description:
                "Once the Mint Page is finalized and the team has customized the contracts as per the team's requirement, the project will be ready for launch as per the creator's choice of date.",
        },
        {
            title: "CREATOR'S DASHBOARD",
            description:
                "The Creator's dashboard will allow the creators to analyze their progress by displaying live tracking features, wallet breakdown, holder details and access to other services provided by Keroverse. ",
        },
    ];
    const features = [
        {
            title: "Custom Launch/Contracts",
            description: "Tailored according to the Creator's Requirement",
        },
        {
            title: "Collection Generator",
            description: "Upload your Input Folder and Generate Art",
        },
        {
            title: "Premium Whitelisting",
            description:
                "Direct Integration with Discord - No need to collect wallet addresses",
        },
        {
            title: "Personalized Mint Page",
            description:
                "Choose a template and update texts + images real-time to customize your own Mint Page",
        },
        {
            title: "Audited Projects only",
            description:
                "Virtual KYC + Video Calls + Documentations collected.",
        },
        {
            title: "100% Bot Proof",
            description:
                "Choose a template and update texts + images real-time to customize your own Mint Page",
        },
        {
            title: "Ad-on Services",
            description:
                "Community Building, Marketing Packages, Premium Listings on Calendars and Marketplaces",
        },
        {
            title: "Launchpad Tier System",
            description: "Integrated with Kerocoin - Coming Soon",
        },
        {
            title: "24/7 Support",
            description:
                "Choose a template and update texts + images real-time to customize your own Mint Page",
        },
    ];

    const fetchCollectionFromAirtable = async () => {
        try {
            const response = await axios.get("/api/collections");
            const collection = response.data.collection?.map((data) => ({
                name: data.name,
                price: data.price,
                supply: data.supply,
                mint_date: data.mint_date,
                url: data.mint_url,
                logo: data.logo[0].url,
            }));
            setCollections(collection);
        } catch (error) {
            console.error(error);
            toast.error(error.message ?? "Something went wrong");
        }
    };
    const fetchPayoutsFromAirtable = async () => {
        try {
            const response = await axios.get("/api/payouts");
            const collection = response.data.payouts?.map((data) => ({
                name: data.name,
                secondary_text: data.secondary_text,
                inner_date: data.inner_date,
                date: data.date,
            }));
            setPayouts(collection);
        } catch (error) {
            console.error(error);
            toast.error(error.message ?? "Something went wrong");
        }
    };

    useEffect(() => {
        fetchCollectionFromAirtable();
        fetchPayoutsFromAirtable();
    }, []);

    const mintingToday = collections.filter(
        (collection) =>
            moment(new Date(collection.mint_date)).format("DD/MM/YY") ===
            moment(new Date()).format("DD/MM/YY")
    );
    const pastMints = collections.filter(
        (collection) =>
            moment(new Date(collection.mint_date)).format("DD/MM/YY") <
            moment(new Date()).format("DD/MM/YY")
    );

    const futureMints = collections.filter(
        (collection) =>
            moment(new Date(collection.mint_date)).format("DD/MM/YY") >
            moment(new Date()).format("DD/MM/YY")
    );

    // group payouts by date
    const groupedPayouts = payouts.reduce((r, a) => {
        r[a.date] = [...(r[a.date] || []), a];
        return r;
    }, {});

    console.log({ groupedPayouts });

    return (
        <>
            {/* <div className="landing-1" />
            <div className="landing-2" />
            <div className="landing-3" />
            <div className="landing-4" /> */}
            <div className=" space-y-20 z-10 bg-transparent">
                <div className="flex items-start space-x-8 my-20 relative">
                    <div className="w-full md:w-3/4 space-y-8 flex flex-col items-center md:block">
                        <div className="text-center md:text-left font-header font-extrabold text-2xl sm:text-4xl md:text-5xl">
                            A Full-Scale Launchpad on Solana
                        </div>
                        <div className="text-center md:text-left  font-satoshi text-secondaryText text-sm sm:text-lg md:text-xl">
                            Lowest Fees. Easiest Process. Seamless Flow.
                            Complete Solution.
                        </div>
                        <div className="">
                            <Link href={routes.Login}>
                                <Button>
                                    Get started{" "}
                                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block pl-12">
                        <img src="/landing.png" className="w-128" />
                    </div>
                    <div className="landing-1" />
                </div>
                {!!mintingToday.length && (
                    <div className="relative">
                        <div className="flex items-center justify-between border-b pb-2 border-border">
                            <span className="font-header sm:text-2xl md:text-3xl">
                                Featured Launch - Minting Now 🔥
                            </span>
                        </div>
                        <div className="py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {mintingToday.map((collection, index) => (
                                <LandingCard
                                    url={collection.url}
                                    key={index}
                                    supply={collection.supply}
                                    price={collection.price}
                                    name={collection.name}
                                    date={collection.mint_date}
                                    logo={collection.logo}
                                />
                            ))}
                        </div>
                        {/* <div className="landing-2" /> */}
                    </div>
                )}
                {futureMints.length > 0 && (
                    <div className="relative">
                        <div className="flex items-center justify-between border-b pb-2 border-border">
                            <span className="font-header sm:text-2xl md:text-3xl">
                                Upcoming launch 🚀
                            </span>
                        </div>
                        <div className="py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {futureMints.map((collection, index) => (
                                <LandingCard
                                    url={collection.url}
                                    key={index}
                                    supply={collection.supply}
                                    price={collection.price}
                                    name={collection.name}
                                    date={collection.mint_date}
                                    logo={collection.logo}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {pastMints.length > 0 && (
                    <div className="relative z-10">
                        <div className="flex items-center justify-between border-b pb-2 border-border">
                            <span className="font-header sm:text-2xl md:text-3xl">
                                Past Collections 🚀
                            </span>
                        </div>
                        <div className="py-12 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {pastMints.map((collection, index) => (
                                <CollectionCard
                                    url={collection.url}
                                    key={index}
                                    supply={collection.supply}
                                    price={collection.price}
                                    name={collection.name}
                                    date={collection.mint_date}
                                    logo={collection.logo}
                                />
                            ))}
                        </div>
                        <div className="landing-2" />
                    </div>
                )}

                <div className=" bg-white text-black -my-12 -mx-4 md:-mx-4 lg:-mx-20 xl:-mx-56 2xl:-mx-80 py-12 md:px-4 lg:px-20 xl:px-56 2xl:px-80 z-10">
                    <div className="flex flex-col-reverse items-center md:items-start md:flex-row justify-between">
                        <div className="p-2 w-full text-center md:text-left md:w-1/2 space-y-8">
                            <div className="text-2xl md:text-5xl font-extrabold z-20">
                                Keroverse NFT
                            </div>
                            <div className="text-sm md:text-base">
                                After eons of protecting the SOL Shards from
                                foreign invaders, the ancient KEROS finally
                                rest, and replace themselves by building the
                                artificially intelligent KEROBOTS. Efficient,
                                ruthless and completely invulnerable, the
                                KEROBOTS became an unstoppable force of nature.
                                However, just when peace began to feel like the
                                new normal to the KEROS, a human time capsule
                                found its way into the Keroverse, wreaking havoc
                                into this pocket dimension.
                            </div>
                            <div className="cursor-pointer">
                                <span
                                    className="text-gradient"
                                    onClick={() => setOpen(true)}
                                >
                                    Checkout payouts
                                </span>
                            </div>
                            <Modal size="sm" open={open} setOpen={setOpen}>
                                <div className="bg-secondaryText">
                                    {Object.entries(groupedPayouts).map(
                                        ([month, payouts], index) => (
                                            <div
                                                key={index}
                                                className="bg-black  rounded-md p-6"
                                            >
                                                <div className="text-xl bg-white p-4 rounded-md mb-6">
                                                    {moment(
                                                        new Date(month)
                                                    ).format("MMM, YYYY")}
                                                </div>
                                                <div className="divide-y divide-border">
                                                    {(payouts as any)?.map(
                                                        (payout, index) => (
                                                            <div key={index}>
                                                                <div className="text-primaryText my-4">
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="text-xl">
                                                                            {
                                                                                payout.name
                                                                            }
                                                                        </div>

                                                                        <div className="text-sm">
                                                                            {moment(
                                                                                new Date(
                                                                                    payout.date
                                                                                )
                                                                            ).format(
                                                                                "DD MMM, YYYY"
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-sm text-secondaryText mt-2">
                                                                        {
                                                                            payout.secondary_text
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </Modal>
                            <div className="flex items-center md:justify-start justify-center">
                                <div className="flex items-center md:flex-row flex-col">
                                    <span
                                        onClick={() =>
                                            setIsKerobotPackage(true)
                                        }
                                        className={` ${
                                            isKerobotPackage
                                                ? "bg-black text-white border-black"
                                                : "bg-white border border-black text-black"
                                        }  cursor-pointer border rounded-full py-2 px-4 mb-4 mr-4`}
                                    >
                                        NFT Holder Fees
                                    </span>
                                    <span
                                        onClick={() =>
                                            setIsKerobotPackage(false)
                                        }
                                        className={` ${
                                            !isKerobotPackage
                                                ? "bg-black text-white border-black"
                                                : "bg-white border border-black text-black"
                                        } cursor-pointer border rounded-full py-2 px-4 mb-4 mr-4`}
                                    >
                                        Non-NFT Holder Fees
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center md:flex-row flex-col md:justify-start justify-center">
                                <div className="bg-secondaryWhite p-4 rounded-md w-48 mr-4 mb-4">
                                    <div className="font-extrabold sm:text-2xl md:text-3xl text-center">
                                        {isKerobotPackage ? "10%" : "20%"}
                                    </div>
                                    <div className="text-secondaryText text-center">
                                        Primary Sales
                                    </div>
                                </div>
                                <div className="bg-secondaryWhite p-4 rounded-md w-48 mr-4 mb-4">
                                    <div className="font-extrabold sm:text-2xl md:text-3xl text-center">
                                        {isKerobotPackage ? "0%" : "10%"}
                                    </div>
                                    <div className="text-secondaryText text-center">
                                        Secondary Sales
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a
                            href="https://magiceden.io/marketplace/keroversenft"
                            target={"_blank"}
                        >
                            <img
                                src="/sampleImage.png"
                                className=" w-72 h-72 lg:w-96 lg:h-96 mb-8"
                            />
                            <Button fullWidth>Buy on secondary platform</Button>
                        </a>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between border-b pb-2 border-border">
                        <span className="font-header sm:text-2xl md:text-3xl">
                            How it works ⚡️
                        </span>
                    </div>
                    <div className="py-12 flex flex-wrap space-y-20 relative">
                        {howItWorks.map((item, index) => (
                            <HowItWorksStep
                                key={index}
                                index={index}
                                item={item}
                            />
                        ))}
                        <div className="landing-3" />
                    </div>
                </div>
                <div className="relative">
                    <div className="flex items-center justify-between border-b pb-2 border-border">
                        <span className="font-header sm:text-2xl md:text-3xl">
                            Features ✨
                        </span>
                    </div>
                    <div className="py-12 flex flex-wrap justify-around">
                        {features.map((item, index) => (
                            <FeatureCard
                                title={item.title}
                                text={item.description}
                                key={index}
                                index={index}
                            />
                        ))}
                    </div>
                    <div className="landing-4" />
                </div>
                <div className="button-gradient p-4 md:p-12 rounded-lg space-y-8">
                    <div className="font-header w-full md:w-1/2 sm:text-2xl md:text-3xl">
                        Create your NFT collection with Keroverse
                    </div>
                    <div className="">
                        <Link href={routes.Login}>
                            <Button variant="white">
                                Create your own collection{" "}
                                <ArrowRightIcon className="h-6 w-6 ml-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPageContent;
