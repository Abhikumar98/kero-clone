import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import {
    CheckCircleIcon,
    CheckIcon,
    ExternalLinkIcon,
    PencilIcon,
} from "@heroicons/react/solid";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { useUser } from "../../../../../context";
import { LaunchCollection } from "../../../../../contracts/Launchpad";
import { routes } from "../../../../utils/routes";
import Button from "../../../Button";

const airtableStatuses = {
    InProgress: "in_progress",
    KYCPending: "e-kyc_pending",
    Verified: "approved",
    Rejected: "rejected",
};

const LaunchCollectionItem = ({ currCollection, fetchLaunchedCollections }) => {
    const router = useRouter();
    const { user } = useUser();
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(
                `/api/launchpad/delete?airtableRecordId=${currCollection?.id}`
            );
            await fetchLaunchedCollections();
            toast.success("Collection deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const redirectToKYCForm = () => {
        window.open("https://airtable.com/shrTT9OIuH5WS2ZeI", "_blank");
    };
    const scheduleCall = () => {
        window.open("https://calendly.com/teamkeroverse", "_blank");
    };

    const statusMappingMap = (status: string) => {
        const formattedString = currCollection?.status?.split("_")?.join(" ");

        switch (status) {
            case airtableStatuses.InProgress:
                return (
                    <span className="ml-4 capitalize text-yellow-400 text-sm rounded-md p-2 bg-secondaryBackground">
                        {formattedString}
                    </span>
                );
            case airtableStatuses.Rejected:
                return (
                    <span className="ml-4 capitalize text-red-400 text-sm rounded-md p-2 bg-secondaryBackground">
                        {formattedString}
                    </span>
                );
            default:
                return (
                    <span className="ml-4 capitalize text-green-500 text-sm rounded-md p-2 bg-secondaryBackground">
                        {formattedString}
                    </span>
                );
        }
    };

    const createCollectionToLaunch = async () => {
        try {
            setLoading(true);

            const sampleCollection: LaunchCollection = {
                ...new LaunchCollection(),
                projectName: "Test Collection",
                primaryContact: user.email,
                twitter: "https://twitter.com",
                assetChoice: "not_started",
            };

            const response = await axios.post(`/api/launchpad/create`, {
                collection: {
                    ...sampleCollection,
                },
                airtableRecordId: currCollection?.id,
            });

            router.push(`/${routes.Mint}/${response.data.id}`);
        } catch (error) {
            console.error(error);
            toast.error(error.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            key={currCollection?.id}
            className=" bg-secondaryBackground p-4 rounded-md"
        >
            <div
                className="flex items-center justify-between"
                onClick={() => setOpen(!open)}
            >
                <span>
                    {currCollection?.name}{" "}
                    {statusMappingMap(currCollection?.status)}
                </span>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
                        {!open && (
                            <>
                                {currCollection?.status ===
                                    airtableStatuses.Verified && (
                                    <div className="flex items-center space-x-4">
                                        <Button
                                            fullWidth
                                            loading={loading}
                                            onClick={createCollectionToLaunch}
                                        >
                                            <PencilIcon className="h-4 w-4 mr-2" />{" "}
                                            Setup Landing Page
                                        </Button>
                                    </div>
                                )}
                                {currCollection?.status ===
                                    airtableStatuses.KYCPending && (
                                    <Button fullWidth onClick={scheduleCall}>
                                        Schedule call
                                        <ExternalLinkIcon className="h-4 w-4 ml-2" />
                                    </Button>
                                )}
                            </>
                        )}
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            loading={loading}
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
                    <div className="border-t border-border mt-4 pt-4 grid grid-cols-5 items-center w-full">
                        <div className="flex flex-col items-center justify-center">
                            <div
                                className={`border border-primaryText h-12 w-12 rounded-full flex items-center justify-center text-sm mb-4 ${
                                    currCollection?.status ===
                                    airtableStatuses.Verified
                                        ? "bg-primaryText"
                                        : ""
                                }`}
                            >
                                {currCollection?.status ===
                                airtableStatuses.Verified ? (
                                    <CheckIcon className="h-6 w-6 text-primaryBackground fill-current" />
                                ) : (
                                    1
                                )}
                            </div>
                            <div className="text-xs text-center">
                                Application approved
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div
                                className={`border border-primaryText h-12 w-12 rounded-full flex items-center justify-center text-sm mb-4 ${
                                    currCollection?.status ===
                                    airtableStatuses.Verified
                                        ? "bg-primaryText"
                                        : ""
                                }`}
                            >
                                {currCollection?.status ===
                                airtableStatuses.Verified ? (
                                    <CheckIcon className="h-6 w-6 text-primaryBackground fill-current" />
                                ) : (
                                    2
                                )}
                            </div>
                            <div className="text-xs text-center">KYC Done</div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div
                                className={`border border-primaryText h-12 w-12 rounded-full flex items-center justify-center text-sm mb-4`}
                            >
                                3
                            </div>
                            <div className="text-xs text-center">
                                Upload Assets
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="border border-primaryText h-12 w-12 rounded-full flex items-center justify-center text-sm mb-4">
                                4
                            </div>
                            <div className="text-xs text-center">
                                Upload Assets
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="border border-primaryText h-12 w-12 rounded-full flex items-center justify-center text-sm mb-4">
                                5
                            </div>
                            <div className="text-xs text-center">
                                Setup Candy Machine
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 w-full">
                        {currCollection?.status ===
                            airtableStatuses.Verified && (
                            <div className="flex items-center space-x-4">
                                <Button
                                    fullWidth
                                    loading={loading}
                                    onClick={createCollectionToLaunch}
                                >
                                    <PencilIcon className="h-4 w-4 mr-2" />{" "}
                                    Setup Landing Page
                                </Button>
                            </div>
                        )}
                        {currCollection?.status ===
                            airtableStatuses.KYCPending && (
                            <Button fullWidth onClick={scheduleCall}>
                                Schedule call
                                <ExternalLinkIcon className="h-4 w-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default LaunchCollectionItem;
