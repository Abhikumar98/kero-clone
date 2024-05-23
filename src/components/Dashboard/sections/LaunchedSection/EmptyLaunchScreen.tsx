import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import Lottie from "react-lottie";
import rocket from "../../../../../lottie/rocket.json";
import { routes } from "../../../../utils/routes";
import Button from "../../../Button";

const EmptyLaunchScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-full w-full mt-24">
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: rocket,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                    },
                }}
                height={128}
                width={128}
            />
            <div className=" uppercase">Apply for Launchpad!</div>
            <div>You dont own any Kerobot to show data</div>
            <a href={"https://airtable.com/shrGttaZYWVm2O7Ip"} target="_blank">
                <Button>
                    Apply now <ArrowRightIcon className="h-4 w-4 ml-4" />
                </Button>
            </a>
        </div>
    );
};

export default EmptyLaunchScreen;
