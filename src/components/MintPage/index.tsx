import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { firebaseCollections } from "../../../config";
import { db } from "../../../config/firebase/client";
import {
    LaunchCollection,
    PublicPagePreferences,
} from "../../../contracts/Launchpad";
import {
    Faq,
    IAboutUsSection,
    IHero,
    MintSections,
    Roadmap,
    Team,
    Theme,
} from "../../../contracts/Mint";
import LandingPage from "../../pages";
import { routes } from "../../utils/routes";
import Button from "../Button";
import Input from "../Input";
import AboutUsSection from "./MintSections/AboutUsSection";
import FAQSection from "./MintSections/FAQSection";
import HeroSection from "./MintSections/HeroSection";
import PublicPage from "./MintSections/PublicPage";
import RoadmapSection from "./MintSections/Roadmap";
import SocialSection from "./MintSections/SocialSection";
import TeamSection from "./MintSections/Team";
import ThemeSection from "./MintSections/ThemeSection";
import LandingPageOptions from "./LandingPageRadio";

const MintPage: React.FC<{
    collection: LaunchCollection;
}> = ({ collection }) => {
    const { id } = collection;
    const route = useRouter();

    const [data, dataLoading, error] = useCollectionData(
        db &&
            id &&
            db
                .collection(firebaseCollections.LAUNCHCOLLECTIONS)
                .where("id", "==", id.toString())
    );

    const [loading, setLoading] = useState(false);

    const mintPageDetails = data?.[0] as any as LaunchCollection;
    const [subdomain, setSubdomain] = useState<string>("");
    const publicPage =
        mintPageDetails?.publicPage ?? new PublicPagePreferences();

    console.log({
        mintPageDetails,
        pag: mintPageDetails?.landingPagePreference,
        de: mintPageDetails?.externalLandingPage,
    });

    const [theme, setTheme] = useState<Theme>(publicPage.theme);
    const [landingPagePreference, setLandingPagePreference] = useState<
        "incupad_template" | "own_landing_page"
    >(mintPageDetails?.landingPagePreference ?? "incupad_template");

    const [externalLandingPage, setExternalLandingPage] = useState<
        string | null
    >(mintPageDetails?.externalLandingPage ?? null);

    const [heroSection, setHeroSection] = useState<IHero>(
        publicPage.heroSection
    );
    const [aboutUsSection, setAboutUsSection] = useState<IAboutUsSection>(
        publicPage.aboutUsSection
    );
    const [roadmap, setRoadmap] = useState<Roadmap>(publicPage.roadmap);
    const [team, setTeam] = useState<Team>(publicPage.team);
    const [faq, setFaq] = useState<Faq>(publicPage.faq);

    const initialSections: Record<
        Partial<MintSections>,
        boolean
    > = publicPage.sections;

    const [enabledSections, setEnabledSections] =
        useState<Record<MintSections, boolean>>(initialSections);

    const [selectedSection, setSelectedSection] = useState<MintSections | null>(
        null
    );
    const [toggleSidebar, setToggleSidebar] = useState(false);

    const router = useRouter();

    const sectionMap = {
        [MintSections.Theme]: (
            <ThemeSection theme={theme} updateTheme={setTheme} />
        ),
        [MintSections.Social]: <SocialSection />,
        [MintSections.HeroSection]: (
            <HeroSection
                heroSection={heroSection}
                updateHero={setHeroSection}
            />
        ),
        [MintSections.AboutUs]: (
            <AboutUsSection
                aboutUsSection={aboutUsSection}
                updateAboutUs={setAboutUsSection}
            />
        ),
        [MintSections.Roadmap]: (
            <RoadmapSection
                roadmapSection={roadmap}
                updateRoadmap={setRoadmap}
            />
        ),
        [MintSections.Team]: (
            <TeamSection teamSection={team} updateTeam={setTeam} />
        ),
        [MintSections.Faqs]: <FAQSection faqSection={faq} updateFaq={setFaq} />,
    };

    const handleBackNavigation = () => {
        sectionMap[selectedSection]
            ? setSelectedSection(null)
            : router.push(routes.Home);
    };

    const handleToggleSections = (section: MintSections) => {
        console.log({ section });
        setEnabledSections((map) => ({
            ...map,
            [section]: !map[section],
        }));
    };

    const handleToggleSidebar = () => {
        setToggleSidebar(!toggleSidebar);
    };

    const saveMintDetails = async () => {
        try {
            let updatedCollection: LaunchCollection = new LaunchCollection();

            if (landingPagePreference === "own_landing_page") {
                updatedCollection = {
                    ...updatedCollection,
                    ...mintPageDetails,
                    externalLandingPage: externalLandingPage,
                    landingPagePreference: "own_landing_page",
                };
            } else {
                if (!subdomain) {
                    toast.error("Please enter a subdomain");
                    return;
                }

                updatedCollection = {
                    ...updatedCollection,
                    ...mintPageDetails,
                    publicPage: {
                        ...publicPage,
                        theme,
                        heroSection,
                        aboutUsSection,
                        roadmap,
                        team,
                        faq,
                        sections: enabledSections,
                        subdomain: subdomain,
                    },
                    landingPagePreference: "incupad_template",
                };
            }

            setLoading(true);

            await axios.post(`/api/launchpad/update`, {
                collection: { ...updatedCollection },
            });
            toast.success("Mint details saved successfully");
            route.push(`${routes.Launchpad}/${updatedCollection.id}`);
        } catch (error) {
            console.log(error);
            toast.error(error.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!dataLoading && !!data.length) {
            setTheme(publicPage.theme);
            setHeroSection(publicPage.heroSection);
            setAboutUsSection(publicPage.aboutUsSection);
            setRoadmap(publicPage.roadmap);
            setTeam(publicPage.team);
            setFaq(publicPage.faq);
            setEnabledSections(publicPage.sections);
            setSubdomain(publicPage.subdomain ?? "");
            setExternalLandingPage(mintPageDetails.externalLandingPage);
            setLandingPagePreference(mintPageDetails.landingPagePreference);
        }
    }, [dataLoading, data]);

    console.log({ landingPagePreference });

    return (
        <div className="flex h-screen relative">
            {toggleSidebar && (
                <div
                    className="top-8 left-0 absolute bg-primaryText text-primaryBackground  py-2 px-4 rounded-r-full cursor-pointer"
                    onClick={handleToggleSidebar}
                >
                    Show
                </div>
            )}
            <div
                className={`relative ${
                    toggleSidebar ? "hidden" : "w-128"
                } border-r border-border p-6 space-y-8 overflow-y-auto`}
            >
                <div className=" flex items-center justify-between">
                    <Button onClick={handleBackNavigation} variant="secondary">
                        {" "}
                        <ArrowLeftIcon className="h-4 w-4 mr-2" /> Go back
                    </Button>
                    <Button variant="secondary" onClick={handleToggleSidebar}>
                        Preview
                    </Button>
                </div>

                <LandingPageOptions
                    checked={landingPagePreference}
                    onChange={setLandingPagePreference}
                />
                {landingPagePreference === "own_landing_page" ? (
                    <div>
                        <Input
                            label="External Landing Page URL"
                            name="landing_page"
                            value={externalLandingPage}
                            onChange={(e) =>
                                setExternalLandingPage(e.target.value)
                            }
                            placeholder="https://example.com"
                        />
                    </div>
                ) : (
                    <>
                        {!!sectionMap[selectedSection] ? (
                            <>{sectionMap[selectedSection]}</>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <Button
                                        onClick={() =>
                                            setSelectedSection(
                                                MintSections.Theme
                                            )
                                        }
                                        variant="secondary"
                                        align="start"
                                        fullWidth
                                    >
                                        <div className="flex justify-between items-center w-full">
                                            <span>Set Theme</span>
                                            <span>
                                                <ArrowRightIcon className="h-4 w-4 ml-2" />
                                            </span>
                                        </div>
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setSelectedSection(
                                                MintSections.Social
                                            )
                                        }
                                        variant="secondary"
                                        align="start"
                                        fullWidth
                                    >
                                        <div className="flex justify-between items-center w-full">
                                            <span>Add Socials</span>
                                            <span>
                                                <ArrowRightIcon className="h-4 w-4 ml-2" />
                                            </span>
                                        </div>
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <div>Subdomain</div>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            value={subdomain}
                                            onChange={(e) =>
                                                setSubdomain(e.target.value)
                                            }
                                            placeholder="collectionname"
                                        />
                                        <div>.keroverse.com</div>
                                    </div>
                                    {publicPage.subdomain && (
                                        <a
                                            href={`https://keroverse.${process.env.NEXT_PUBLIC_HOST_NAME}`}
                                            target={"_blank"}
                                            className="underline my-2 inline-block"
                                        >
                                            https://{publicPage.subdomain ?? ""}
                                            .{process.env.NEXT_PUBLIC_HOST_NAME}
                                        </a>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div>Add Content</div>
                                    <div className=" flex items-center justify-between ">
                                        <div
                                            onClick={() =>
                                                setSelectedSection(
                                                    MintSections.HeroSection
                                                )
                                            }
                                            className="cursor-pointer bg-secondaryButtonBackground px-5 py-2 rounded-l-md w-full"
                                        >
                                            Hero section
                                        </div>
                                        {!enabledSections[
                                            MintSections.HeroSection
                                        ] ? (
                                            <div className="bg-secondaryButtonBackground py-2 px-4 rounded-r-md">
                                                <span
                                                    onClick={() =>
                                                        handleToggleSections(
                                                            MintSections.HeroSection
                                                        )
                                                    }
                                                    className="h-6 w-6 hover:text-blue-500 cursor-pointer text-xs"
                                                >
                                                    Add
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="bg-secondaryButtonBackground py-2 px-4 rounded-r-md">
                                                <span
                                                    onClick={() =>
                                                        handleToggleSections(
                                                            MintSections.HeroSection
                                                        )
                                                    }
                                                    className="h-6 w-6 hover:text-red-400 cursor-pointer text-xs"
                                                >
                                                    Remove
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className=" flex items-center justify-between ">
                                        <div
                                            onClick={() =>
                                                setSelectedSection(
                                                    MintSections.AboutUs
                                                )
                                            }
                                            className="cursor-pointer bg-secondaryButtonBackground px-5 py-2 rounded-l-md w-full"
                                        >
                                            About us
                                        </div>
                                        {!enabledSections[
                                            MintSections.AboutUs
                                        ] ? (
                                            <div className="bg-secondaryButtonBackground py-2 px-4 rounded-r-md">
                                                <span
                                                    onClick={() =>
                                                        handleToggleSections(
                                                            MintSections.AboutUs
                                                        )
                                                    }
                                                    className="h-6 w-6 hover:text-blue-500 cursor-pointer text-xs"
                                                >
                                                    Add
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="bg-secondaryButtonBackground py-2 px-4 rounded-r-md">
                                                <span
                                                    onClick={() =>
                                                        handleToggleSections(
                                                            MintSections.AboutUs
                                                        )
                                                    }
                                                    className="h-6 w-6 hover:text-red-400 cursor-pointer text-xs"
                                                >
                                                    Remove
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className=" flex items-center justify-between ">
                                        <div
                                            onClick={() =>
                                                setSelectedSection(
                                                    MintSections.Roadmap
                                                )
                                            }
                                            className="cursor-pointer bg-secondaryButtonBackground px-5 py-2 rounded-l-md w-full"
                                        >
                                            Roadmap
                                        </div>
                                        {!enabledSections[
                                            MintSections.Roadmap
                                        ] ? (
                                            <div className="bg-secondaryButtonBackground py-2 px-4 rounded-r-md">
                                                <span
                                                    onClick={() =>
                                                        handleToggleSections(
                                                            MintSections.Roadmap
                                                        )
                                                    }
                                                    className="h-6 w-6 hover:text-blue-500 cursor-pointer text-xs"
                                                >
                                                    Add
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="bg-secondaryButtonBackground py-2 px-4 rounded-r-md">
                                                <span
                                                    onClick={() =>
                                                        handleToggleSections(
                                                            MintSections.Roadmap
                                                        )
                                                    }
                                                    className="h-6 w-6 hover:text-red-400 cursor-pointer text-xs"
                                                >
                                                    Remove
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className=" flex items-center justify-between ">
                                        <div
                                            onClick={() =>
                                                setSelectedSection(
                                                    MintSections.Team
                                                )
                                            }
                                            className="cursor-pointer bg-secondaryButtonBackground px-5 py-2 rounded-l-md w-full"
                                        >
                                            Team
                                        </div>
                                        {!enabledSections[MintSections.Team] ? (
                                            <div className="bg-secondaryButtonBackground py-2 px-4 rounded-r-md">
                                                <span
                                                    onClick={() =>
                                                        handleToggleSections(
                                                            MintSections.Team
                                                        )
                                                    }
                                                    className="h-6 w-6 hover:text-blue-500 cursor-pointer text-xs"
                                                >
                                                    Add
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="bg-secondaryButtonBackground py-2 px-4 rounded-r-md">
                                                <span
                                                    onClick={() =>
                                                        handleToggleSections(
                                                            MintSections.Team
                                                        )
                                                    }
                                                    className="h-6 w-6 hover:text-red-400 cursor-pointer text-xs"
                                                >
                                                    Remove
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className=" flex items-center justify-between ">
                                        <div
                                            onClick={() =>
                                                setSelectedSection(
                                                    MintSections.Faqs
                                                )
                                            }
                                            className="cursor-pointer bg-secondaryButtonBackground px-5 py-2 rounded-l-md w-full"
                                        >
                                            FAQs
                                        </div>
                                        {!enabledSections[MintSections.Faqs] ? (
                                            <div className="bg-secondaryButtonBackground py-2 px-4 rounded-r-md">
                                                <span
                                                    onClick={() =>
                                                        handleToggleSections(
                                                            MintSections.Faqs
                                                        )
                                                    }
                                                    className="h-6 w-6 hover:text-blue-500 cursor-pointer text-xs"
                                                >
                                                    Add
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="bg-secondaryButtonBackground py-2 px-4 rounded-r-md">
                                                <span
                                                    onClick={() =>
                                                        handleToggleSections(
                                                            MintSections.Faqs
                                                        )
                                                    }
                                                    className="h-6 w-6 hover:text-red-400 cursor-pointer text-xs"
                                                >
                                                    Remove
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
                <Button loading={loading} fullWidth onClick={saveMintDetails}>
                    Save and Upload assets{" "}
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Button>
            </div>
            {landingPagePreference === "incupad_template" && (
                <PublicPage
                    heroSection={heroSection}
                    theme={theme}
                    aboutUsSection={aboutUsSection}
                    roadmap={roadmap}
                    team={team}
                    faq={faq}
                    sectionMap={enabledSections}
                />
            )}
        </div>
    );
};

export default MintPage;
