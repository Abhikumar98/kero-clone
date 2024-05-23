import { BadgeCheckIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import {
    Faq,
    IAboutUsSection,
    IHero,
    MintSections,
    Roadmap,
    Team,
    Theme,
} from "../../../../../contracts/Mint";
import { applyTheme } from "../../../../../utils/client";
import Button from "../../../Button";
import FAQCollapse from "./FAQCollapse";
import ImageMarquee from "./ImageMarquee";

const PublicPage: React.FC<{
    theme: Theme;
    heroSection: IHero;
    aboutUsSection: IAboutUsSection;
    roadmap: Roadmap;
    team: Team;
    faq: Faq;
    sectionMap: Record<MintSections, boolean>;
}> = ({
    theme,
    team,
    heroSection,
    aboutUsSection,
    roadmap,
    faq,
    sectionMap,
}) => {
    const [currentTheme, setCurrentTheme] = React.useState<"light" | "dark">(
        "dark"
    );

    useEffect(() => {
        applyTheme(theme[currentTheme]);
    }, [theme, currentTheme]);

    return (
        <div
            className={`w-full min-h-screen overflow-y-auto ${
                currentTheme === "light" ? "bg-white" : "bg-black"
            }`}
        >
            <div className="flex items-center justify-end absolute right-8 top-4">
                {currentTheme === "light" ? (
                    <div
                        onClick={() => setCurrentTheme("dark")}
                        className="cursor-pointer text-black"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    </div>
                ) : (
                    <div
                        onClick={() => setCurrentTheme("light")}
                        className="cursor-pointer text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    </div>
                )}
            </div>

            {sectionMap["hero-section"] && (
                <>
                    <div className="flex items-center justify-between w-full p-16">
                        <div className="w-1/2 space-y-8">
                            <div className="text-publicHeadingText font-publicPrimaryFont text-6xl font-bold">
                                {heroSection.title}
                            </div>
                            <div className="text-publicSubheadingText font-publicSecondaryFont text-xl">
                                {heroSection.subtitle}
                            </div>
                            <Button publicButton>
                                {heroSection.buttonText}
                            </Button>
                        </div>
                        <img
                            src={heroSection.image}
                            className="h-96 w-96"
                            alt="Hero image"
                        />
                    </div>
                    <div className="my-8">
                        <ImageMarquee />
                    </div>
                </>
            )}
            {sectionMap["about-us"] && (
                <div className="flex items-center justify-between w-full p-16">
                    <img
                        className="h-96 w-96"
                        alt="About us image"
                        src={aboutUsSection.image}
                    />
                    <div className="w-1/2 space-y-8">
                        <div className="text-publicHeadingText font-publicPrimaryFont text-6xl font-bold">
                            {aboutUsSection.title}
                        </div>
                        <div className="text-publicSubheadingText font-publicSecondaryFont text-xl">
                            {aboutUsSection.subtitle}
                        </div>
                    </div>
                </div>
            )}
            {sectionMap["roadmap"] && (
                <div className="w-full p-16">
                    <div className="w-1/2 space-y-4">
                        <div className="text-publicHeadingText font-publicPrimaryFont text-6xl font-bold">
                            {roadmap.title}
                        </div>
                        <div className="text-publicSubheadingText font-publicSecondaryFont text-xl">
                            {roadmap.subtitle}
                        </div>
                    </div>
                    <div className="mt-12 w-2/3">
                        {roadmap.roadmaps.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start relative"
                            >
                                <div className="flex flex-col items-center space-y-4 h-full relative ">
                                    <div
                                        className={`absolute py-2 ${
                                            currentTheme === "light"
                                                ? "bg-white"
                                                : "bg-black"
                                        }`}
                                    >
                                        <BadgeCheckIcon className="h-8 w-8 text-publicHeadingText fill-current" />
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className={`pl-8 ${
                                            index + 1 ===
                                            roadmap.roadmaps.length
                                                ? ""
                                                : "border-l-2"
                                        } text-publicHeadingText font-publicPrimaryFont text-4xl font-bold`}
                                    >
                                        {item.title}
                                    </div>
                                    <div
                                        className={`pl-8 ${
                                            index + 1 ===
                                            roadmap.roadmaps.length
                                                ? ""
                                                : "border-l-2"
                                        } text-publicSubheadingText font-publicPrimaryFont pb-8 font-bold`}
                                    >
                                        {item.subtitle}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {sectionMap["team"] && (
                <div className="w-full p-16">
                    <div className="w-1/2 space-y-4">
                        <div className="text-publicHeadingText font-publicPrimaryFont text-6xl font-bold">
                            {team.title}
                        </div>
                        <div className="text-publicSubheadingText font-publicSecondaryFont text-xl">
                            {team.subtitle}
                        </div>
                    </div>
                    <div className="flex flex-wrap my-12 mx-auto justify-center">
                        {team.members.map((member, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center flex-col mr-16 mb-8 space-y-2"
                            >
                                <img
                                    className=" w-28 h-28"
                                    src={member.image}
                                />
                                <div className="text-publicHeadingText font-publicSecondaryFont">
                                    {member.title ?? " "}
                                </div>
                                <div className=" text-publicSubheadingText font-publicSecondaryFont">
                                    {member.subtitle ?? " "}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {sectionMap["faqs"] && (
                <div className="w-full p-16">
                    <div className="w-1/2 space-y-4">
                        <div className="text-publicHeadingText font-publicPrimaryFont text-6xl font-bold">
                            {faq.title}
                        </div>
                        <div className="text-publicSubheadingText font-publicSecondaryFont text-xl">
                            {faq.subtitle}
                        </div>
                    </div>
                    <div className="space-y-4 my-16">
                        {faq.faqs.map((item, index) => (
                            <FAQCollapse
                                key={index}
                                title={item.title}
                                subtitle={item.subtitle}
                                currentTheme={currentTheme}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PublicPage;
