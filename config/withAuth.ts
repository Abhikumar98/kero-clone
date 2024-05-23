import { getSubdomain, isValidSubdomain } from "./../utils/server/index";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from ".";
import { getUserFromEmail } from "./firebase/queries";

export const withAuth = (api: any) =>
    withIronSessionApiRoute(
        async (req: NextApiRequest, res: NextApiResponse) => {
            const subdomain = getSubdomain(req);
            const isCustomSubdomain = isValidSubdomain(subdomain);

            if (isCustomSubdomain) {
                res.status(401).send(
                    "Custom subdomain being used for application"
                );
                return;
            }

            const { session } = req;

            const { auth } = session as any;

            const user = await getUserFromEmail(auth.email);

            if (!user) {
                res.status(401).send("Unauthorized");
                return;
            }

            return api(req, res, user);
        },
        ironOptions
    );
