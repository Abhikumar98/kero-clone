import { useRouter } from "next/router";
import { useEffect } from "react";
import withServerSidePropsAuth from "../../config/withServerSidePropsAuth";
import { uploadToIPFS } from "../../utils/client";
import DashboardSection from "../components/Dashboard/sections/DashboardSection";
import GenerateSection from "../components/Dashboard/sections/GenerateSection";
import LaunchedSection from "../components/Dashboard/sections/LaunchedSection";
import SettingsSection from "../components/Dashboard/sections/SettingsSection";
import SideMenu from "../components/Dashboard/SideMenu";

export const getServerSideProps = withServerSidePropsAuth(
    async ({ req, res }) => {
        return {
            props: {},
        };
    }
);

export default () => {
    const {
        query: { section },
    } = useRouter();

    const getSectionFromRoute = () => {
        switch (section) {
            // case "dashboard":
            //     return <DashboardSection />;
            case "generate":
                return <GenerateSection />;
            case "launched":
                return <LaunchedSection />;
            case "settings":
                return <SettingsSection />;
            default:
                return <GenerateSection />;
            // return <DashboardSection />;
        }
    };

    // useEffect(() => {
    //     // just for testing
    //     uploadToIPFS();
    // }, []);

    return (
        <div className="flex items-start space-x-4 h-full w-full">
            <div className="border-r border-secondaryButtonBackground h-full pr-4">
                <SideMenu />
            </div>
            <div className="w-full">{getSectionFromRoute()}</div>
        </div>
    );
};
