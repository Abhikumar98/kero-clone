import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { firebaseCollections } from "../../../../config";
import { adminDb } from "../../../../config/firebase/server";
import { getOrCreateUser } from "./../../../../config/firebase/queries";
import { google } from "googleapis";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import emailTemplate from "../../../../utils/server/emailTemplate";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method !== "POST") throw new Error("Method not allowed");

    try {
        const { email } = req.body;

        const user = await getOrCreateUser(email);

        const otp = Math.floor(1000 + Math.random() * 9000);
        await adminDb.doc(`${firebaseCollections.USERS}/${user.id}`).update({
            // otp: "1234",
            otp: otp.toString(),
        });

        const clientId = process.env.NEXT_PUBLIC_GMAIL_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_GMAIL_CLIENT_SECRET;
        const redirectURI = "https://developers.google.com/oauthplayground";
        const refresh_token = process.env.NEXT_PUBLIC_GMAIL_REFRESH_TOKEN;

        const oauth = new google.auth.OAuth2(
            clientId,
            clientSecret,
            redirectURI
        );

        oauth.setCredentials({
            refresh_token,
        });

        const accessToken = await oauth.getAccessToken();

        console.log("set user");
        // let testAccount = await nodemailer.createTestAccount();

        const transport: SMTPTransport.Options = {
            service: "gmail",
            auth: {
                type: "OAUTH2",
                user: "checkingoutyourproduct@gmail.com",
                clientId,
                clientSecret,
                refreshToken: refresh_token,
                accessToken: accessToken.token,
            },
        };

        const transporter = nodemailer.createTransport(transport);

        await transporter.sendMail({
            from: "Keroverse <checkingoutyourproduct@gmail.com>", // sender address
            to: user.email, // list of receivers
            subject: "Keroverse OTP", // Subject line
            text: `Login in Incupad Keroverse with OTP: ${otp}`, // plain text body
            html: emailTemplate.replace("{OTP}", otp.toString()), // html body
        });

        // console.log("set mail", response);

        res.status(200).json({ ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false });
    }
};

export default logout;
