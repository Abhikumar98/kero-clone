import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { Airtable, ironOptions } from "../../../../config";
import {
    createCollection,
    editCollection,
} from "../../../../config/firebase/queries";
import { withAuth } from "../../../../config/withAuth";
import { User } from "../../../../contracts/User";

const getLaunchpadCollections = async (
    req: NextApiRequest,
    res: NextApiResponse,
    user: User
) => {
    const { method } = req;
    if (method !== "GET") throw new Error("Method not allowed");

    try {
        Airtable.select({
            filterByFormula: `AND({already_used}=0, {email}="${user.email}", {deleted}=0)`,
        }).firstPage((err, records) => {
            if (err) {
                return res.send({
                    status: "error",
                    message: "Error fetching data",
                });
            }

            if (records.length === 0) {
                return res.send({
                    status: "error",
                    message: "No data found",
                });
            }

            const [result] = records;
            console.log({ result });
            return res
                .status(200)
                .json({ collection: { ...result.fields, id: result.id } });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default withAuth(getLaunchpadCollections);
