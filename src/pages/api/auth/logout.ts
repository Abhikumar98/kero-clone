import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../../../config";
import { withAuth } from "../../../../config/withAuth";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method !== "GET") throw new Error("Method not allowed");

    req.session.destroy();
    res.send({ ok: true });
};

export default withAuth(logout);
