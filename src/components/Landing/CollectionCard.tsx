import React from "react";

const CollectionCard = ({ name, date, price, supply, logo, url }) => {
    return (
        <a
            href={url}
            target="_blank"
            className=" bg-secondaryBackground rounded-md flex items-center p-4 mr-4 mb-4 space-x-4"
        >
            <img src={logo} className="h-14 w-14 rounded-md" />
            <div className="w-48">
                <div>{name}</div>
                <div className=" text-secondaryText">{price} SOL</div>
            </div>
        </a>
    );
};

export default CollectionCard;
