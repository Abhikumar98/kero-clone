import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import Lottie from "react-lottie";
import rubiks from "../../../../../lottie/rubiks.json";
import { routes } from "../../../../utils/routes";
import Button from "../../../Button";

const EmptyCollectionScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-full w-full mt-24">
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: rubiks,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                    },
                }}
                height={128}
                width={128}
            />
            <div className=" uppercase">No Collection found!</div>
            <div>You dont own any Kerobot to show data</div>

            <Link href={`${routes.Generate}`}>
                <Button>
                    Generate Collection{" "}
                    <ArrowRightIcon className="h-4 w-4 ml-4" />
                </Button>
            </Link>
        </div>
    );
};

export default EmptyCollectionScreen;
