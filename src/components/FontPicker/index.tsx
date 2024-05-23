import {
    Category,
    Font,
    FontManager,
    Options,
    Script,
    SortOption,
    Variant,
} from "@samuelmeuli/font-manager";
import React, { useEffect, useState } from "react";
import CustomSelect from "../Select/CustomSelect";
import Select from "../Select/Select";

interface FontProps {
    activeFontFamily: string;
    onChange?: (font: Font) => void;
    pickerId: string;
    families?: string[];
    categories?: Category[];
    scripts?: Script[];
    onHandle: (value: string) => void;
    variants?: Variant[];
    placeholder?: string;
    filter?: (font: Font) => boolean;
    limit?: number;
    sort?: SortOption;
    className?: string;
}

interface FontPickerOption {
    label: string;
    value: string;
}
const FontPicker: React.FC<FontProps> = ({
    onHandle,
    onChange,
    activeFontFamily,
    pickerId,
    sort,
    placeholder,
    className,
}) => {
    const options = {
        pickerId,
    };

    const [fontManager] = useState(
        () =>
            new FontManager(
                process.env.NEXT_PUBLIC_GOOGLE_API,
                activeFontFamily,
                options as Options,
                onChange
            )
    );
    console.log({ fontManager });
    const [fontList, setFontList] = useState<FontPickerOption[]>([]);

    useEffect(() => {
        fontManager
            .init()
            .then((): void => {
                const fonts = Array.from(fontManager.getFonts().values());
                const fontoptions = fonts?.map((a) => ({
                    value: a?.family || "",
                    label: a?.family || "",
                    className: `font-button-${a?.family
                        ?.replace(/\s+/g, "-")
                        .toLowerCase()}`,
                }));
                setFontList(fontoptions);
            })
            .catch((err: Error): void => {
                // On error: Log error message
                console.error(
                    "Error trying to fetch the list of available fonts"
                );
                console.error(err);
            });
    }, []);

    return (
        <div>
            <Select
                onChange={(value) => {
                    console.log(value);
                    fontManager.setActiveFont(value.toString());
                    onHandle(value.toString());
                }}
                value={activeFontFamily}
                list={fontList}
            />
            {/* <CustomSelect
                onChange={(value) => {
                    fontManager.setActiveFont(value);
                    onHandle(value);
                }}
                placeholder={placeholder}
                defaultValue={activeFontFamily}
                values={fontList}
                className={className}
                virtual={false}
                value={activeFontFamily}
            /> */}
        </div>
    );
};

export default FontPicker;
