import React from "react";

const HowItWorksStep = ({ index, item }) => {
    const shouldAlignRight = (index + 1) % 2 === 0;

    return (
        <div
            className={`flex ${
                shouldAlignRight
                    ? "flex-col items-end sm:flex-row-reverse"
                    : "flex-col sm:flex-row"
            } items-start md:items-center`}
        >
            <div className="mb-4 bg-secondaryBackground px-8 md:px-20 py-8 rounded-2xl text-5xl">
                {index + 1}
            </div>
            <div className={`md:mx-8 ${shouldAlignRight ? "text-right" : ""}`}>
                <div className="text-2xl font-bold">{item.title}</div>
                <div
                    className={`text-secondaryText w-full md:w-5/6 ${
                        shouldAlignRight ? "ml-auto" : ""
                    }`}
                >
                    {item.description}
                </div>
            </div>
        </div>
    );
};

export default HowItWorksStep;
