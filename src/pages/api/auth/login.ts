import { firebaseCollections, ironOptions } from "./../../../../config/index";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "../../../../config/firebase/server";
import { getUserFromEmail } from "./../../../../config/firebase/queries";
// import { getOrCreateUser } from "../../../utils/server";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") throw new Error("Method not allowed");

    res.setHeader("Allow", ["POST"]);

    try {
        const { code, email } = req.body;

        const user = await getUserFromEmail(email);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.otp !== code) {
            return res.status(401).json({ message: "Incorrect OTP" });
        }

        await adminDb
            .doc(`${firebaseCollections.USERS}/${user.id}`)
            .update({ otp: null });

        (req.session as any).auth = {
            ...user,
        };

        console.log(req.session);

        await req.session.save();

        res.json({ user });
    } catch (_error) {
        res.status(500).json({ ok: false });
    }
};

export default withIronSessionApiRoute(login, ironOptions);
