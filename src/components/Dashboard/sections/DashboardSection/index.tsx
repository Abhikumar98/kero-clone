import { ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";
import Button from "../../../Button";
import SecondarySection from "../../../SecondarySection";
import SectionHeader from "../../../SectionHeader";

const DashboardSection = () => {
    const redirectToForm = () => {
        window.open("https://google.com", "_blank");
    };

    return (
        <div>
            {false ? (
                <div>
                    <SecondarySection
                        rightIcon={<img src="/sample.png" />}
                        heading={"My Dashboard"}
                        primaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-4 h-full w-full mt-24">
                    <img src="/sample.svg" className="h-32 w-32" />
                    <div className=" uppercase">No kerobot found!</div>
                    <div>
                        Buy a kerobot from secondary sales to be able to view
                        analytics.
                    </div>
                    {/* <Link href={routes.Launchpad}> */}
                    <Button onClick={redirectToForm}>
                        Buy kerobot from secondary sales{" "}
                        <ArrowRightIcon className="h-4 w-4 ml-4" />
                    </Button>
                    {/* </Link> */}
                </div>
            )}
        </div>
    );
};

export default DashboardSection;
