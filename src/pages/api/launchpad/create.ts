import { NextApiRequest, NextApiResponse } from "next";
import { Airtable } from "../../../../config";
import { withAuth } from "../../../../config/withAuth";
import { LaunchCollection } from "../../../../contracts/Launchpad";
import { User } from "../../../../contracts/User";
import { createLaunchCollection } from "./../../../../config/firebase/queries";

const getLaunchpadCollections = async (
    req: NextApiRequest,
    res: NextApiResponse,
    user: User
) => {
    const { method } = req;
    if (method !== "POST") throw new Error("Method not allowed");

    try {
        const { collection, airtableRecordId } = req.body;

        const checkIfValid =
            !collection.projectName ||
            !collection.primaryContact ||
            !collection.twitter ||
            !collection.assetChoice ||
            !collection.publicPage;

        if (checkIfValid) {
            throw new Error("Invalid collection");
        }

        const newCollection: LaunchCollection = {
            ...new LaunchCollection(),
            projectName: collection.projectName,
            primaryContact: collection.primaryContact,
            twitter: collection.twitter,
            discord: collection.discord,
            website: collection.website,
            assetChoice: collection.assetChoice,
            publicPage: collection.publicPage,
            deleted: false,
        };

        await Airtable.update(airtableRecordId, {
            already_used: true,
        });
        const response = await createLaunchCollection(newCollection, user);

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default withAuth(getLaunchpadCollections);
