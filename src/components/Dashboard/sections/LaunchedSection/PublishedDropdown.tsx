import axios from "axios";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { firebaseCollections } from "../../../../../config";
import { db } from "../../../../../config/firebase/client";
import { CollectionDetails } from "../../../../../contracts/Generate";
import { LaunchCollection } from "../../../../../contracts/Launchpad";
import Button from "../../../Button";

const PublishedDropdown = ({
    launchedCollection,
    collectionId,
    totalRevenue,
}) => {
    const [loading, setLoading] = React.useState(false);

    const [data, error, dataLoading] = useCollectionData(
        db &&
            collectionId &&
            db
                .collection(firebaseCollections.COLLECTIONS)
                .where("id", "==", collectionId)
    );

    const collection = data?.map((doc) => doc.data() as CollectionDetails)?.[0];

    const unpublishCollection = async () => {
        try {
            if (!launchedCollection || !collection) {
                return;
            }
            setLoading(true);
            const updatedCollection: LaunchCollection = {
                ...launchedCollection,
                published: true,
            };
            await axios.post(`/api/launchpad/update`, {
                collection: { ...updatedCollection },
            });
        } catch (error) {
            console.error(error);
            toast.error(error.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 mt-4 border-t border-border">
            <div className="flex items-center pt-4 space-x-4">
                <div className="w-full rounded-md bg-secondaryBackground p-3">
                    <span className="mr-4 text-secondaryText">Minted:</span>
                    123/123
                </div>
                <div className="w-full rounded-md bg-secondaryBackground p-3">
                    <span className="mr-4 text-secondaryText">
                        Floor Price:
                    </span>{" "}
                    12 SOL
                </div>
            </div>

            <div className="divide-y divide-border">
                <div className="w-full rounded-t-md bg-secondaryBackground p-3 flex items-center justify-between">
                    <span className="text-secondaryText">Total Revenue:</span>
                    <span>123 SOL</span>
                </div>
                {collection?.royaltySplit?.map((split, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between w-full bg-secondaryBackground p-3"
                    >
                        <span>{split.address}</span>
                        <span>{totalRevenue * (split.split / 100)} SOL</span>
                    </div>
                ))}
            </div>
            <Button
                loading={loading}
                variant="secondary"
                fullWidth
                onClick={unpublishCollection}
            >
                Unpublish
            </Button>
        </div>
    );
};

export default PublishedDropdown;
