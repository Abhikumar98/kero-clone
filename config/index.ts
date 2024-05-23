import { default as AirtableDefault } from "airtable";
import { serialize } from "cookie";
import { NextApiResponse } from "next";

export const TOKEN_NAME = "signature";
export const ACCOUNT = "account";
export const API_KEY_TOKEN_NAME = "apiKey";
const MAX_AGE = 60 * 60 * 8;

export const removeAuthCookies = (res: NextApiResponse) => {
    const expireConfig = {
        maxAge: 0,
        expires: new Date("12/12/2120"),
    };

    res.setHeader("Set-Cookie", [
        createCookie(TOKEN_NAME, "", expireConfig),
        createCookie("authed", "", expireConfig),
    ]);
};

export const createCookie = (name: string, data: any, options = {}) => {
    return serialize(name, data, {
        expires: new Date("12/12/2120"),
        secure: process.env.NODE_ENV === "production",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        ...options,
    });
};

export interface ICookie {
    name: string;
    value: string;
}

export const setTokenCookie = (res: NextApiResponse, cookies: ICookie[]) => {
    res.setHeader("Set-Cookie", [
        ...cookies.map((cookie) =>
            createCookie(cookie.name, cookie.value, {
                maxAge: MAX_AGE,
            })
        ),
        createCookie("authed", true, { httpOnly: false }),
    ]);
};

export const getDataFromCookie = (req: any, tokenName: string) => {
    return req.cookies[tokenName];
};
export const getAuthToken = (req: any) => {
    return req?.cookies?.[TOKEN_NAME];
};

export const ironOptions = {
    cookieName: "auth",
    password: `t/D<&,83oc$x~5z@dXT6+,LNV&p*ZDR4zRw'i75v"E~cgR0gmj!}#/('eL^:4cw`,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export const firebaseCollections = {
    USERS: "users",
    COLLECTIONS: "collections",
    LAUNCHCOLLECTIONS: "launch",
};

export const AirtableConfig = new AirtableDefault({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE);

export const Airtable = AirtableConfig(
    process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME
);
