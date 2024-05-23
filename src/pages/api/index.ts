import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../config/withAuth";
import { User } from "../../../contracts/User";
// import { getOrCreateUser } from "../../../utils/server";

const userFromCookies = async (
    req: NextApiRequest,
    res: NextApiResponse,
    user: User
) => {
    if (req.method !== "GET") throw new Error("Method not allowed");

    res.setHeader("Allow", ["GET"]);

    try {
        res.json({ user });
    } catch (_error) {
        res.status(500).json({ ok: false });
    }
};

export default withAuth(userFromCookies);
