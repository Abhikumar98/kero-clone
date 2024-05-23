import { ArrowRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Lottie from "react-lottie";
import { firebaseCollections } from "../../../config";
import { db } from "../../../config/firebase/client";
import withServerSidePropsAuth from "../../../config/withServerSidePropsAuth";
import rocket from "../../../lottie/rocket.json";
import Button from "../../components/Button";
import SectionHeader from "../../components/SectionHeader";
import { routes } from "../../utils/routes";

export const getServerSideProps = withServerSidePropsAuth(
    async ({ req, res }) => {
        return {
            props: {},
        };
    }
);

const LaunchpadCollectionSetup = () => {
    const {
        query: { collectionId },
    } = useRouter();

    const [data, loading, error] = useCollectionData(
        db &&
            collectionId &&
            db
                .collection(firebaseCollections.LAUNCHCOLLECTIONS)
                .where("id", "==", collectionId.toString())
    );

    const handleFolderUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { files } = e.target;
        const uploadedFiles = [
            ...Object.values(files ?? {}).filter(
                (f) => !f.name.startsWith(".")
            ),
        ];
        console.log({ uploadedFiles });
    };

    return (
        <div className="w-11/12 md:w-5/6 lg:w-full xl:w-2/3 mx-auto">
            <SectionHeader
                heading={"Upload Assets to IPFS"}
                primaryText={"Step 2"}
                rightIcon={
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: rocket,
                            rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice",
                            },
                        }}
                        height={64}
                        width={64}
                    />
                }
            />
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="cover-photo"
                        className="block text-primaryText font-satoshi mb-4"
                    >
                        Upload Assets
                    </label>
                </div>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="flex justify-center px-6 py-6 border-2 bg-secondaryBackground border-dashed border-secondaryButtonBackground rounded-md font-satoshi">
                        <div className="space-y-1 text-center">
                            <svg
                                className="mx-auto h-12 w-12"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="flex flex-col items-center text-sm">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        webkitdirectory=""
                                        mozdirectory=""
                                        onChange={handleFolderUpload}
                                    />
                                </label>
                                <p className="text-secondaryText">or</p>
                                <p className="pb-2 text-secondaryText">
                                    Drag and drop the asset folder
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-8">
                    <Link href={`${routes.CMConfig}/${collectionId}`}>
                        <Button fullWidth>
                            Configure Candy Machine{" "}
                            <ArrowRightIcon className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LaunchpadCollectionSetup;
