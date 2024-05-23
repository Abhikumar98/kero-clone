import {
    ChevronDownIcon,
    ChevronUpIcon,
    ExternalLinkIcon,
    PencilIcon,
} from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";
import axios from "axios";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { CollectionDetails } from "../../../../../contracts/Generate";
import { LaunchCollection } from "../../../../../contracts/Launchpad";
import { routes } from "../../../../utils/routes";
import Button from "../../../Button";
import PublishedDropdown from "./PublishedDropdown";

const AcceptedCollections: React.FC<{
    readonly collection: LaunchCollection;
}> = ({ collection }) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(
                `/api/launchpad/delete?collectionId=${collection.id}`
            );
            toast.success("Collection deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handlePublishCollection = async () => {
        try {
            setLoading(true);
            const updatedCollection: LaunchCollection = {
                ...collection,
                published: true,
            };
            await axios.post(`/api/launchpad/update`, {
                collection: { ...updatedCollection },
            });
        } catch (error) {
            console.error(error);
            toast.error(error.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const renderButton = () => {
        if (collection.published) {
            const link = !!collection.externalLandingPage
                ? collection.externalLandingPage
                : `https://${collection.publicPage.subdomain}.${process.env.NEXT_PUBLIC_APP_HOST_NAME}`;
            <a target={"_blank"} href={link}>
                <Button fullWidth loading={loading}>
                    <ExternalLinkIcon className="h-4 w-4 mr-2" /> {link}
                </Button>
            </a>;
        }

        if (collection.assetHash) {
            return (
                <Link href={`${routes.CMConfig}/${collection.id}`}>
                    <Button fullWidth loading={loading}>
                        <PencilIcon className="h-4 w-4 mr-2" /> Configure Candy
                        Machine
                    </Button>
                </Link>
            );
        }
        if (
            collection.publicPage?.subdomain ||
            !!collection.externalLandingPage
        ) {
            return (
                <Link href={`${routes.Launchpad}/${collection.id}`}>
                    <Button fullWidth loading={loading}>
                        <PencilIcon className="h-4 w-4 mr-2" /> Upload Assets
                    </Button>
                </Link>
            );
        }

        return (
            <Link href={`${routes.Mint}/${collection.id}`}>
                <Button fullWidth loading={loading}>
                    <PencilIcon className="h-4 w-4 mr-2" /> Setup Landing Page
                </Button>
            </Link>
        );
    };

    return (
        <div
            key={collection.id}
            className="bg-secondaryBackground p-4 rounded-md"
        >
            <div
                className="flex items-center justify-between"
                onClick={() => setOpen(!open)}
            >
                <span>{collection.projectName}</span>
                <div className="flex items-center space-x-4">
                    {!open && (
                        <div className="flex items-center space-x-4">
                            {renderButton()}
                        </div>
                    )}
                    <div className="flex items-center space-x-4">
                        <Button
                            loading={loading}
                            variant="danger"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                        {open ? (
                            <ChevronUpIcon className="h-6 w-6 text-primaryText" />
                        ) : (
                            <ChevronDownIcon className="h-6 w-6 text-primaryText" />
                        )}
                    </div>
                </div>
            </div>
            {open && (
                <>
                    {!collection.published && (
                        <>
                            <div className="border-t border-border mt-4 pt-4 items-center grid grid-cols-5 justify-center place-items-center">
                                <div className="flex flex-col items-center justify-center">
                                    <div
                                        className={`border border-primaryText h-12 w-12 rounded-full flex items-center justify-center text-sm mb-4 bg-primaryText`}
                                    >
                                        <CheckIcon className="h-6 w-6 text-primaryBackground fill-current" />
                                    </div>
                                    <div className="text-xs text-center">
                                        Application approved
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <div
                                        className={`border border-primaryText h-12 w-12 rounded-full flex items-center justify-center text-sm mb-4 bg-primaryText`}
                                    >
                                        <CheckIcon className="h-6 w-6 text-primaryBackground fill-current" />
                                    </div>
                                    <div className="text-xs text-center">
                                        KYC Done
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <div
                                        className={`border border-primaryText h-12 w-12 rounded-full flex items-center justify-center text-sm mb-4 group ${
                                            (collection.publicPage?.subdomain ||
                                                collection.externalLandingPage) &&
                                            "bg-primaryText"
                                        }`}
                                    >
                                        {collection.publicPage?.subdomain ||
                                        collection.externalLandingPage ? (
                                            <>
                                                <CheckIcon className="h-6 w-6 text-primaryBackground fill-current group-hover:hidden" />
                                                <span>
                                                    <Link
                                                        href={`${routes.Mint}/${collection.id}`}
                                                    >
                                                        <PencilIcon className=" p-3 h-full w-full text-primaryBackground cursor-pointer hidden group-hover:flex" />
                                                    </Link>
                                                </span>
                                            </>
                                        ) : (
                                            3
                                        )}
                                    </div>
                                    <div className="text-xs text-center">
                                        Setup Landing Page
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <div
                                        className={`border border-primaryText h-12 w-12 rounded-full flex items-center group justify-center text-sm mb-4 ${
                                            collection.assetHash &&
                                            "bg-primaryText"
                                        }`}
                                    >
                                        {collection.assetHash ? (
                                            <>
                                                <CheckIcon className="h-6 w-6 text-primaryBackground fill-current" />
                                                <span>
                                                    <Link
                                                        href={`${routes.Launchpad}/${collection.id}`}
                                                    >
                                                        <PencilIcon className=" p-3 h-full w-full text-primaryBackground cursor-pointer hidden group-hover:flex" />
                                                    </Link>
                                                </span>
                                            </>
                                        ) : (
                                            4
                                        )}
                                    </div>
                                    <div className="text-xs text-center">
                                        Upload Assets
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <div
                                        className={`border border-primaryText h-12 w-12 rounded-full flex items-center group justify-center text-sm mb-4 ${
                                            collection.cm_id && "bg-primaryText"
                                        }`}
                                    >
                                        {collection.cm_id ? (
                                            <>
                                                <CheckIcon className="h-6 w-6 text-primaryBackground fill-current" />
                                                <span>
                                                    <Link
                                                        href={`${routes.CMConfig}/${collection.id}`}
                                                    >
                                                        <PencilIcon className=" p-3 h-full w-full text-primaryBackground cursor-pointer hidden group-hover:flex" />
                                                    </Link>
                                                </span>
                                            </>
                                        ) : (
                                            5
                                        )}
                                    </div>
                                    <div className="text-xs text-center">
                                        {collection.cm_id ? (
                                            <span>
                                                Candy machine setup done.
                                            </span>
                                        ) : (
                                            "Setup candy machine"
                                        )}
                                    </div>
                                </div>
                            </div>
                            {collection.cm_id && !collection.published && (
                                <div className="mt-4">
                                    <Button
                                        fullWidth
                                        variant="secondary"
                                        onClick={handlePublishCollection}
                                    >
                                        Publish
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                    <div className="mt-4">{renderButton()}</div>
                    {collection.published && (
                        <PublishedDropdown
                            launchedCollection={collection}
                            collectionId={collection.collectionDetailsId}
                            totalRevenue={200}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default AcceptedCollections;
