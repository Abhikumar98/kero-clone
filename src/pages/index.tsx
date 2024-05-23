import React from "react";
import { getCollectionFromSubdomain } from "../../config/firebase/queries";
import { LaunchCollection } from "../../contracts/Launchpad";
import { getSubdomain, isValidSubdomain } from "../../utils/server";
import LandingPageContent from "../components/Landing";
import PublicPage from "../components/MintPage/MintSections/PublicPage";

export const getServerSideProps = async ({ req, res }) => {
    // const subdomain = getSubdomain(req);
    // const isValid = isValidSubdomain(subdomain);

    // if (!isValid) {
    //     return {
    //         props: {
    //             skipAuth: true,
    //             landing: true,
    //         },
    //     };
    // }

    // console.log("subdomain", subdomain);

    // const collection = await getCollectionFromSubdomain(subdomain);

    // if (!collection) {
    //     return {
    //         props: {
    //             skipAuth: true,
    //             isInvalidSubdomain: true,
    //             hideHeader: true,
    //             publicPage: true,
    //         },
    //     };
    // }
    return {
        props: {
            skipAuth: true,
            publicPage: true,
        },
        redirect: {
            destination: `https://generator.${process.env.NEXT_PUBLIC_HOST_NAME}/login`,
        },
    };

    // return {
    //     props: {
    //         skipAuth: true,
    //         collection,
    //         publicPage: true,
    //         hideHeader: true,
    //         customTheme: true,
    //         darkTheme: collection.publicPage?.theme?.dark ?? null,
    //         lightTheme: collection.publicPage?.theme?.light ?? null,
    //     },
    // };
};

const LandingPage: React.FC<{
    isInvalidSubdomain: boolean;
    collection: LaunchCollection;
}> = ({ isInvalidSubdomain, collection }) => {
    if (isInvalidSubdomain) {
        return <div>Bro this subdomain doesn't exist</div>;
    }

    if (collection) {
        const { publicPage } = collection;
        const {
            theme,
            heroSection,
            aboutUsSection,
            roadmap,
            team,
            faq,
            sections,
        } = publicPage;

        return (
            <PublicPage
                theme={theme}
                heroSection={heroSection}
                aboutUsSection={aboutUsSection}
                roadmap={roadmap}
                team={team}
                faq={faq}
                sectionMap={sections}
            />
        );
    }

    return <LandingPageContent />;
};

export default LandingPage;
