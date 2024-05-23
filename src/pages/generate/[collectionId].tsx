import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { firebaseCollections } from "../../../config";
import { db } from "../../../config/firebase/client";
import withServerSidePropsAuth from "../../../config/withServerSidePropsAuth";
import { CollectionDetails } from "../../../contracts/Generate";
import UploadDetails from "../../components/GenerateSteps/UploadDetails";

export const getServerSideProps = withServerSidePropsAuth(
    async ({ req, res }) => {
        return {
            props: {},
        };
    }
);

const EditGeneratedCollection = () => {
    const {
        query: { collectionId },
    } = useRouter();
    const [loading, setLoading] = useState(false);

    const [currentCollectionDetails, setCurrentCollectionDetails] =
        useState<CollectionDetails | null>(null);

    const fetchGeneratedCollection = async (collection: string) => {
        try {
            const response = await db
                .doc(`${firebaseCollections.COLLECTIONS}/${collection}`)
                .get();
            const collectionData = response.data() as CollectionDetails;
            setCurrentCollectionDetails(collectionData);
        } catch (error) {
            console.error(error);
            toast.error(error.message ?? "Something went wrong");
        }
    };

    const saveCollection = async (data: CollectionDetails) => {
        try {
            setLoading(true);
            await axios.post(`/api/generate/edit`, { collectionDetails: data });
            toast.success("Collection updated successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGeneratedCollection(collectionId?.toString());
    }, [collectionId]);

    return (
        <div className="w-11/12 md:w-5/6 lg:w-full xl:w-2/3 mx-auto">
            {!currentCollectionDetails && <div>Loading data...</div>}
            {!!currentCollectionDetails?.id && (
                <UploadDetails
                    type="view"
                    loading={loading}
                    collectionDetails={currentCollectionDetails}
                />
            )}
        </div>
    );
};

export default EditGeneratedCollection;
