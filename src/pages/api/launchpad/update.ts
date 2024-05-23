import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../../config/withAuth";
import { LaunchCollection } from "../../../../contracts/Launchpad";
import { User } from "../../../../contracts/User";
import { updatedLaunchedCollection } from "./../../../../config/firebase/queries";

const updateMintDetails = async (
    req: NextApiRequest,
    res: NextApiResponse,
    user: User
) => {
    const { method } = req;
    if (method !== "POST") throw new Error("Method not allowed");

    try {
        const { collection } = req.body;

        if (collection.userId !== user.id) {
            throw new Error("Unathorized");
        }

        const newCollection: LaunchCollection = {
            ...new LaunchCollection(),
            ...collection,
        };

        const response = await updatedLaunchedCollection(newCollection, user);

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default withAuth(updateMintDetails);
