import React from "react";

const ServerErrorPage = () => {
    return (
        <div>
            Please make sure you aren't on any custom domain.{" "}
            <a href={`https://generator.${process.env.NEXT_PUBLIC_HOST_NAME}`}>
                Click here to go back
            </a>
        </div>
    );
};

export default ServerErrorPage;
