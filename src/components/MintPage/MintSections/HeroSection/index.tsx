import React, { useState } from "react";
import toast from "react-hot-toast";
import { storage } from "../../../../../config/firebase/client";
import { IHero, Theme } from "../../../../../contracts/Mint";
import Input from "../../../Input";
import ImageUploading from "react-images-uploading";
import ImageUploader from "../ImageUploader";

const HeroSection: React.FC<{
    heroSection: IHero;
    updateHero: (theme: IHero) => void;
}> = ({ heroSection, updateHero }) => {
    const [selectedVariant, setSelectedVariant] =
        useState<keyof Theme>("light");

    const [images, setImages] = React.useState([]);
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
            handleHeroSectionUpdate("image")(downloadURL, true);
        } else {
            handleHeroSectionUpdate("image")("", true);
        }
        setImages(imageList);
    };

    const handleHeroSectionUpdate =
        (themeName: keyof IHero) => (value: any, isImage?: boolean) => {
            console.log("something");
            const updatedTheme: IHero = {
                ...heroSection,
                [themeName]: isImage ? value : value.target.value,
            };

            updateHero(updatedTheme);
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
                    value={heroSection.title}
                    onChange={handleHeroSectionUpdate("title")}
                    placeholder="Add 1-liner about your project"
                />
            </div>
            <div className="space-y-2">
                <div>Paragraph Text</div>
                <Input
                    value={heroSection.subtitle}
                    onChange={handleHeroSectionUpdate("subtitle")}
                    placeholder="Add little detail about your project"
                    multiline
                />
            </div>
            <div className="space-y-2">
                <div>Button Text</div>
                <Input
                    value={heroSection.buttonText}
                    onChange={handleHeroSectionUpdate("buttonText")}
                    placeholder="Add mint CTA text"
                />
            </div>
        </div>
    );
};

export default HeroSection;
