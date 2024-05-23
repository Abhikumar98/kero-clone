import { NextApiRequest, NextApiResponse } from "next";
import { Airtable } from "../../../../config";
import { deleteLaunchedCollection } from "../../../../config/firebase/queries";
import { withAuth } from "../../../../config/withAuth";
import { User } from "../../../../contracts/User";

const deleteLaunchpadCollection = async (
    req: NextApiRequest,
    res: NextApiResponse,
    user: User
) => {
    const { method } = req;
    if (method !== "DELETE") throw new Error("Method not allowed");

    try {
        const { airtableRecordId, collectionId } = req.query;

        if (airtableRecordId) {
            await Airtable.update(airtableRecordId.toString(), {
                deleted: true,
            });
        }

        if (collectionId) {
            await deleteLaunchedCollection(collectionId.toString());
        }

        return res.send({});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default withAuth(deleteLaunchpadCollection);
