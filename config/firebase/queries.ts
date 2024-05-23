import { firebaseCollections } from "..";
import { CollectionDetails } from "../../contracts/Generate";
import { LaunchCollection } from "../../contracts/Launchpad";
import { User } from "../../contracts/User";
import { adminDb } from "./server";

export const getOrCreateUser = async (email: string): Promise<User> => {
    const user = await getUserFromEmail(email);

    if (user) {
        return user;
    }

    const docRef = adminDb.collection(firebaseCollections.USERS).doc();
    const newUser: User = {
        ...new User(),
        id: docRef.id,
        email: email,
    };
    console.log({ newUser });

    await docRef.set({ ...newUser });

    return newUser;
};

export const getUserFromEmail = async (email: string): Promise<User | null> => {
    const user = await adminDb
        .collection(firebaseCollections.USERS)
        .where("email", "==", email)
        .get();

    if (user.empty) {
        return null;
    }

    return user.docs[0].data() as User;
};

export const createCollection = async (
    collectionDetails: CollectionDetails,
    user: User
): Promise<CollectionDetails> => {
    const docRef = adminDb.collection(firebaseCollections.COLLECTIONS).doc();
    const newCollectionDetails: CollectionDetails = {
        ...collectionDetails,
        userId: user.id,
        id: docRef.id,
    };

    await docRef.set({ ...newCollectionDetails });

    return newCollectionDetails;
};

export const editCollection = async (
    collectionDetails: CollectionDetails,
    user: User
): Promise<CollectionDetails> => {
    await adminDb
        .doc(`${firebaseCollections.COLLECTIONS}/${collectionDetails.id}`)
        .update({
            ...collectionDetails,
        });

    return collectionDetails;
};

export const createLaunchCollection = async (
    collection: LaunchCollection,
    user: User
): Promise<LaunchCollection> => {
    const docRef = adminDb
        .collection(firebaseCollections.LAUNCHCOLLECTIONS)
        .doc();

    const newCollectionDetails: LaunchCollection = {
        ...collection,
        userId: user.id,
        id: docRef.id,
    };

    await docRef.set({ ...newCollectionDetails });

    return newCollectionDetails;
};

export const updatedLaunchedCollection = async (
    collection: LaunchCollection,
    user: User
): Promise<LaunchCollection> => {
    const docRef = adminDb
        .collection(firebaseCollections.LAUNCHCOLLECTIONS)
        .doc(collection.id);

    const newCollectionDetails: LaunchCollection = {
        ...collection,
        userId: user.id,
        id: docRef.id,
    };

    await docRef.update({ ...newCollectionDetails });

    return newCollectionDetails;
};

export const getCollectionFromSubdomain = async (
    subdomain: string
): Promise<LaunchCollection> => {
    const response = await adminDb
        .collection(firebaseCollections.LAUNCHCOLLECTIONS)
        .where("publicPage.subdomain", "==", subdomain?.toLowerCase())
        .where("deleted", "==", false)
        .where("published", "==", true)
        .get();

    if (response.empty) {
        return null;
    }

    return response.docs[0].data() as LaunchCollection;
};

export const deleteLaunchedCollection = async (collectionId: string) => {
    await adminDb
        .doc(`${firebaseCollections.LAUNCHCOLLECTIONS}/${collectionId}`)
        .update({ deleted: true });
};
