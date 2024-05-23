import React, { useState } from "react";
import { storage } from "../../../../../config/firebase/client";
import { IAboutUsSection, IHero, Theme } from "../../../../../contracts/Mint";
import Input from "../../../Input";
import ImageUploader from "../ImageUploader";

const AboutUsSection: React.FC<{
    aboutUsSection: IAboutUsSection;
    updateAboutUs: (theme: IAboutUsSection) => void;
}> = ({ aboutUsSection, updateAboutUs }) => {
    const [images, setImages] = React.useState(
        aboutUsSection.image ? [{ data_url: aboutUsSection.image }] : []
    );
    const [loading, setLoading] = React.useState(false);
    const onChange = async (imageList) => {
        if (imageList.length > 0) {
            const { file } = imageList[0];
            setLoading(true);
            const response = await storage
                .ref(`images/${file.name ?? ""}`)
                .put(file);
            console.log({ response });
            const downloadURL = await response.ref.getDownloadURL();
            console.log(
                "🚀 ~ file: index.tsx ~ line 31 ~ handleUpload ~ downloadURL",
                downloadURL
            );
            setLoading(false);
            handleAboutSectionUpdate("image")(downloadURL, true);
        } else {
            handleAboutSectionUpdate("image")("", true);
        }
        setImages(imageList);
    };

    const handleAboutSectionUpdate =
        (themeName: keyof IAboutUsSection) =>
        (value: any, isImage?: boolean) => {
            const updatedTheme: IAboutUsSection = {
                ...aboutUsSection,
                [themeName]: isImage ? value : value.target.value,
            };

            updateAboutUs(updatedTheme);
        };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div>Upload Hero Image</div>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="flex w-full rounded-md font-satoshi">
                        <div className="space-y-1 text-center w-full">
                            <div className="flex text-sm items-center flex-col w-full">
                                <ImageUploader
                                    images={images}
                                    onChange={onChange}
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <div>Heading Text</div>
                <Input
                    value={aboutUsSection.title}
                    onChange={handleAboutSectionUpdate("title")}
                    placeholder="Add 1-liner about your project"
                />
            </div>
            <div className="space-y-2">
                <div>Paragraph Text</div>
                <Input
                    value={aboutUsSection.subtitle}
                    onChange={handleAboutSectionUpdate("subtitle")}
                    placeholder="Add little detail about your project"
                    multiline
                />
            </div>
        </div>
    );
};

export default AboutUsSection;
