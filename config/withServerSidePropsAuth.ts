import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from ".";
import { routes } from "../src/utils/routes";
import { getSubdomain, isValidSubdomain } from "../utils/server";

// commenting for force deploy

export default (api: any) =>
    withIronSessionSsr(async ({ req, res }) => {
        console.log("came till here");
        const subdomain = getSubdomain(req);
        const isCustomSubdomain = isValidSubdomain(subdomain);

        console.log({ subdomain, isCustomSubdomain });

        if (isCustomSubdomain) {
            console.log("redirecting from here");
            return {
                props: {},
                redirect: {
                    destination: `https://generator.${process.env.NEXT_PUBLIC_HOST_NAME}`,
                },
            };
        }

        // if (!(req.session as any)?.auth) {
        //     console.log("redirecting from here, no auth");
        //     return {
        //         props: {},
        //         redirect: {
        //             destination: routes.Login,
        //             permanent: false,
        //         },
        //     };
        // }

        return api({ req, res });
    }, ironOptions);
