import { NextApiRequest, NextApiResponse } from "next";
import { Airtable, AirtableConfig } from "../../../config";

const getPayouts = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method !== "GET") throw new Error("Method not allowed");

    try {
        AirtableConfig("Payouts")
            .select()
            .firstPage((err, records) => {
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

                return res
                    .status(200)
                    .json({ payouts: records?.map((rec) => rec.fields) });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default getPayouts;
