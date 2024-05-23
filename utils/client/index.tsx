import { Theme, ThemeColors } from "../../contracts/Mint";
import { PublicKey } from "@solana/web3.js";
// import { create } from "ipfs-http-client";

export const applyTheme = (theme: ThemeColors) => {
    Object.entries(theme).forEach(([key, value]) => {
        (document.querySelector(":root") as any)?.style?.setProperty(
            `--${key}`,
            value
        );
    });
};

export const validateSolAddress = (address: string) => {
    try {
        let pubkey = new PublicKey(address);
        console.log({ pubkey });
        let isSolana = PublicKey.isOnCurve(pubkey.toBuffer());
        return isSolana;
    } catch (error) {
        return false;
    }
};

// const ipfs = create({});

export const uploadToIPFS = async () => {
    // const folderhas = await ipfs.files.mkdir("/asdf");
    // console.log({ folderhas });
};
