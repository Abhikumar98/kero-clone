import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../../../config";
import { createCollection } from "../../../../config/firebase/queries";
import { withAuth } from "../../../../config/withAuth";
import { User } from "../../../../contracts/User";

const logout = async (
    req: NextApiRequest,
    res: NextApiResponse,
    user: User
) => {
    const { method } = req;
    if (method !== "POST") throw new Error("Method not allowed");

    try {
        const { collectionDetails } = req.body;

        const generatedCollection = await createCollection(
            collectionDetails,
            user
        );

        res.status(200).json({ collection: generatedCollection });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default withAuth(logout);
