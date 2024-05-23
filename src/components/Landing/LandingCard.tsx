import React from "react";
import moment from "moment";

const LandingCard = ({ name, date, price, supply, logo, url }) => {
    console.log({ url });
    return (
        <a
            href={url}
            target="_blank"
            className="rounded-md w-full bg-secondaryBackground mr-2 sm:mr-4 mb-12 cursor-pointer hover-border-gradient border-gradient"
        >
            <img src={logo} className="w-full rounded-md" />
            <div className="px-4 py-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="block truncate">{name}</span>
                    <span className=" text-secondaryText">
                        {moment(new Date(date)).format("DD/MM/YY")}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span>{price} SOL</span>
                    <span className=" text-secondaryText">{supply}</span>
                </div>
            </div>
        </a>
    );
};

export default LandingCard;
