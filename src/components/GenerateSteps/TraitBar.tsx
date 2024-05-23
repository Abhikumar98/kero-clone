import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React from "react";
import Input from "../Input";

const TraitBar = ({ layer, contents, updateRarityChange }) => {
    const [collapsed, setCollapsed] = React.useState(true);

    const handleRarityChange = (e) => (index: number) => {
        if (Number(e.target.value) > 100) {
            return;
        }

        updateRarityChange(layer, index, Number(e.target.value));
    };

    const getFileName = (file: string) => {
        const split = file.split("/");
        const fileName = split[split.length - 1];

        const filenameSplit = fileName.split("_");

        return { fileName };
    };

    return (
        <div
            onClick={() => collapsed && setCollapsed((c) => !c)}
            className={`bg-secondaryBackground p-4 rounded-md ${
                collapsed ? " cursor-pointer " : ""
            }`}
        >
            <div
                onClick={() => !collapsed && setCollapsed((c) => !c)}
                className="capitalize cursor-pointer flex items-center justify-between"
            >
                <span>{layer}</span>
                <div className="flex items-center space-x-4">
                    <span className="text-secondaryText">Set rarity</span>
                    {collapsed ? (
                        <ChevronDownIcon className="h-6 w-6" />
                    ) : (
                        <ChevronUpIcon className="h-6 w-6" />
                    )}
                </div>
            </div>
            {!collapsed && (
                <div className="mt-4 space-y-4">
                    {contents?.map((image, index) => {
                        const { fileName } = getFileName(
                            image.webkitRelativePath
                        );
                        console.log({ i: image });

                        return (
                            <div
                                key={index}
                                className="bg-secondaryBackground p-4 rounded-md flex justify-between items-center"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={image.image}
                                        className="h-16 w-16"
                                    />
                                    <span>{fileName}</span>
                                </div>
                                <span>
                                    <div className="w-24 flex items-center space-x-2">
                                        <Input
                                            value={image.weight}
                                            onChange={(e) =>
                                                handleRarityChange(e)(index)
                                            }
                                        />
                                        <span>%</span>
                                    </div>
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TraitBar;
