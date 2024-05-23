import React, { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import { firebaseCollections } from "../../../../../config";
import { db } from "../../../../../config/firebase/client";
import { useUser } from "../../../../../context";
import { LaunchCollection } from "../../../../../contracts/Launchpad";
import rocket from "../../../../../lottie/rocket.json";
import Button from "../../../Button";
import SecondarySection from "../../../SecondarySection";
import AcceptedCollections from "./AcceptedCollections";
import EmptyLaunchScreen from "./EmptyLaunchScreen";
import LaunchCollectionItem from "./LaunchCollectionItem";

const LaunchedSection = () => {
    const [airtableCollection, setAirtableCollection] = React.useState([]);

    const fetchLaunchedCollections = async () => {
        try {
            const response = await fetch("/api/launchpad");
            const data = await response.json();

            const cleanedData = {};

            setAirtableCollection(data.collection ? [data.collection] : []);
        } catch (error) {
            console.error(error);
            toast.error(error.message ?? "Something went wrong");
        }
    };
    console.log({ airtableCollection });

    const { user } = useUser();

    const [collections, error, loading] = useCollectionData<LaunchCollection[]>(
        db &&
            user?.id &&
            db
                .collection(firebaseCollections.LAUNCHCOLLECTIONS)
                .where("deleted", "==", false)
                .where("userId", "==", user.id)
    );

    const formattedCollections =
        collections?.map(
            (collection) => collection as any as LaunchCollection
        ) ?? [];

    useEffect(() => {
        fetchLaunchedCollections();
    }, []);

    return (
        <div className="mb-8">
            {!!airtableCollection.length || !!formattedCollections.length ? (
                <div className="space-y-4">
                    <SecondarySection
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
                        heading={"Launch Collection"}
                        primaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                    />
                    <a
                        href={"https://airtable.com/shrGttaZYWVm2O7Ip"}
                        target="_blank"
                        className="block"
                    >
                        <Button fullWidth variant="secondary">
                            Launch New Collection
                        </Button>
                    </a>
                    <div className="space-y-6">
                        {formattedCollections.map((collection) => (
                            <AcceptedCollections
                                key={collection.id}
                                collection={collection}
                            />
                        ))}
                        {airtableCollection?.map((currCollection) => (
                            <LaunchCollectionItem
                                fetchLaunchedCollections={
                                    fetchLaunchedCollections
                                }
                                currCollection={currCollection}
                                key={currCollection?.id}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <EmptyLaunchScreen />
            )}
        </div>
    );
};

export default LaunchedSection;
