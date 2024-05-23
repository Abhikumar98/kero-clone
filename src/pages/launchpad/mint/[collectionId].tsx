import { useRouter } from "next/router";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebaseCollections } from "../../../../config";
import { db } from "../../../../config/firebase/client";
import withServerSidePropsAuth from "../../../../config/withServerSidePropsAuth";
import { LaunchCollection } from "../../../../contracts/Launchpad";
import MintPage from "../../../components/MintPage";

export const getServerSideProps = withServerSidePropsAuth(
    async ({ req, res }) => {
        return {
            props: {
                hideHeader: true,
                publicPage: true,
            },
        };
    }
);

const Mint = () => {
    const {
        query: { collectionId },
    } = useRouter();

    const [data, dataLoading, error] = useCollectionData(
        db &&
            collectionId &&
            db
                .collection(firebaseCollections.LAUNCHCOLLECTIONS)
                .where("id", "==", collectionId.toString())
    );

    const mintPageDetails = data?.[0] as any as LaunchCollection;

    return mintPageDetails ? <MintPage collection={mintPageDetails} /> : null;
};

export default Mint;
