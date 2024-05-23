import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Theme, ThemeColors } from "../../../../../contracts/Mint";
import Button from "../../../Button";
const FontPicker = dynamic(() => import("../../../FontPicker"), {
    ssr: false,
});
import Select from "../../../Select/Select";
import ReactColor from "./ReactColor";

const ThemeSection: React.FC<{
    theme: Theme;
    updateTheme: (theme: Theme) => void;
}> = ({ theme, updateTheme }) => {
    const [selectedVariant, setSelectedVariant] =
        useState<keyof Theme>("light");

    const handleThemeChange =
        (themeName: keyof ThemeColors) => (value: string) => {
            const updatedTheme: Theme = {
                ...theme,
                [selectedVariant]: {
                    ...theme[selectedVariant],
                    [themeName]: value,
                },
            };
            updateTheme(updatedTheme);
        };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div>Theme</div>
                <Select
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.toString() as any)}
                    list={[
                        { value: "light", label: "Light" },
                        { value: "dark", label: "Dark" },
                    ]}
                />
            </div>
            <div className="space-y-2">
                <div>Colour</div>
                <div className="cursor-pointer bg-secondaryButtonBackground px-5 py-2 rounded-md flex flex-col">
                    <ReactColor
                        text="Heading Text"
                        onChange={handleThemeChange("publicHeadingText")}
                        selectedColor={theme[selectedVariant].publicHeadingText}
                    />
                    <ReactColor
                        text="Subheading Text"
                        onChange={handleThemeChange("publicSubheadingText")}
                        selectedColor={
                            theme[selectedVariant].publicSubheadingText
                        }
                    />
                    <ReactColor
                        text="Button Background"
                        onChange={handleThemeChange("publicButtonBackground")}
                        selectedColor={
                            theme[selectedVariant].publicButtonBackground
                        }
                    />
                    <ReactColor
                        text="Button Text"
                        onChange={handleThemeChange("publicButtonText")}
                        selectedColor={theme[selectedVariant].publicButtonText}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <div>Primary Font</div>
                <FontPicker
                    placeholder="Select a heading font"
                    activeFontFamily={theme[selectedVariant].publicPrimaryFont}
                    pickerId="heading"
                    onHandle={handleThemeChange("publicPrimaryFont")}
                    className="w-full"
                />
            </div>
            <div className="space-y-2">
                <div>Secondary font</div>
                <FontPicker
                    placeholder="Select a subtitle font"
                    activeFontFamily={
                        theme[selectedVariant].publicSecondaryFont
                    }
                    pickerId="heading"
                    onHandle={handleThemeChange("publicSecondaryFont")}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default ThemeSection;
