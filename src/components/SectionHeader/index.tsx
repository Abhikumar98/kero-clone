import React from "react";

const SectionHeader = ({ heading, primaryText, rightIcon }) => {
    return (
        <div className="bg-secondaryBackground p-8 rounded-lg flex items-center justify-between mb-8">
            <div className="flex flex-col space-y-2 justify-start items-start">
                <span className="font-satoshi text-gradient">
                    {primaryText}
                </span>
                <div className="md:text-lg lg:text-xl xl:text-2xl uppercase font-header">
                    {heading}
                </div>
            </div>
            <div>{rightIcon}</div>
        </div>
    );
};

export default SectionHeader;
