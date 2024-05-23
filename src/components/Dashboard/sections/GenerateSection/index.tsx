import { DownloadIcon, EyeIcon, PencilIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Lottie from "react-lottie";
import { firebaseCollections } from "../../../../../config";
import { db } from "../../../../../config/firebase/client";
import { useUser } from "../../../../../context";
import { CollectionDetails } from "../../../../../contracts/Generate";
import rubiks from "../../../../../lottie/rubiks.json";
import { routes } from "../../../../utils/routes";
import Button from "../../../Button";
import SecondarySection from "../../../SecondarySection";
import EmptyCollectionScreen from "./EmptyScreen";

const GenerateSection = () => {
    const { user } = useUser();
    const router = useRouter();

    const [generations, error, loading] = useCollectionData<
        CollectionDetails[]
    >(
        db &&
            user &&
            db
                .collection(firebaseCollections.COLLECTIONS)
                .where("userId", "==", user?.id)
    );

    const formattedGenerations: CollectionDetails[] = (generations as any)?.map(
        (generation) => generation
    );

    return (
        <div>
            {!!formattedGenerations?.length ? (
                <div className="space-y-4">
                    <div>
                        <SecondarySection
                            rightIcon={
                                <Lottie
                                    options={{
                                        loop: true,
                                        autoplay: true,
                                        animationData: rubiks,
                                        rendererSettings: {
                                            preserveAspectRatio:
                                                "xMidYMid slice",
                                        },
                                    }}
                                    height={64}
                                    width={64}
                                />
                            }
                            heading={"Generate Collection"}
                            primaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                        />
                    </div>
                    <Link href={`${routes.Generate}`}>
                        <Button fullWidth>Generate New Collection</Button>
                    </Link>
                    <div className="space-y-6">
                        {formattedGenerations?.map((generation) => (
                            <div
                                key={generation.id}
                                className=" bg-secondaryBackground p-4 rounded-md flex items-center justify-between"
                            >
                                <span>{generation?.collectionName}</span>
                                <div className="flex items-center space-x-4">
                                    {/* <Button
                                        onClick={() =>
                                            alert("After generation is done.")
                                        }
                                    >
                                        {" "}
                                        <DownloadIcon className="h-4 w-4 mr-2" />{" "}
                                        Download Assets
                                    </Button> */}
                                    <Link
                                        href={`${routes.Generate}/${generation.id}`}
                                    >
                                        <Button variant="secondary">
                                            <EyeIcon className="h-4 w-4 mr-2" />{" "}
                                            View details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <EmptyCollectionScreen />
            )}
        </div>
    );
};

export default GenerateSection;
