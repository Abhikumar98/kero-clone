import React from "react";

const SecondarySection = ({ heading, primaryText, rightIcon }) => {
    return (
        <div className="bg-secondaryBackground p-8 rounded-lg flex items-center justify-between mb-8 font-satoshi">
            <div className="flex flex-col space-y-2 justify-start items-start">
                <div className="md:text-lg lg:text-xl xl:text-2xl uppercase">
                    {heading}
                </div>
                <span className="">{primaryText}</span>
            </div>
            <div>{rightIcon}</div>
        </div>
    );
};

export default SecondarySection;
