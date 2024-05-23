import React from "react";

const FeatureCard = ({ index, text, title }) => {
    return (
        <div className="p-4 h-64 w-72 bg-secondaryBackground rounded-md flex flex-col items-center justify-around mb-8">
            <img src={`/feature-${index + 1}.svg`} className="h-16 w-16" />
            <div>
                <div className=" w-full text-center font-bold">{title}</div>
                <div className=" w-full text-center">{text}</div>
            </div>
        </div>
    );
};

export default FeatureCard;
