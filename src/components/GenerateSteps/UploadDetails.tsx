import React, { useState } from "react";
import SectionHeader from "../SectionHeader";
import Lottie from "react-lottie";
import rubiks from "../../../lottie/rubiks.json";
import Input from "../Input";
import Button from "../Button";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { routes } from "../../utils/routes";
import { CollectionDetails } from "../../../contracts/Generate";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { validateSolAddress } from "../../../utils/client";
import { useUser } from "../../../context";

interface IUploadDetails {
    readonly collectionDetails: CollectionDetails;
    readonly onNext?: (data: CollectionDetails) => void;
    readonly type?: "edit" | "create" | "view";
    readonly loading?: boolean;
    readonly nextText?: string;
}

const UploadDetails: React.FC<IUploadDetails> = ({
    collectionDetails,
    onNext,
    type,
    nextText,
    loading,
}) => {
    const { kerobotOwner } = useUser();

    const isViewMode = type === "view";

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
    } = useForm({
        defaultValues: {
            ...collectionDetails,
        },
    });
    const { fields, append, prepend, remove, swap, move, insert } =
        useFieldArray({
            control,
            name: "royaltySplit",
        });

    const onSubmit = (data: CollectionDetails) => {
        console.log({ data });
        const { royaltySplit } = data;

        if (!royaltySplit || !royaltySplit?.length) {
            toast.error("Please add at least one royalty split");
            return;
        }

        if (!kerobotOwner && data.totalSupply > 1500) {
            toast.error(
                "You can only create a collection with a total supply of 1500 or less"
            );
            return;
        }

        let invalidCount = 0;

        royaltySplit.forEach((curr, index) => {
            const isValidAddress = validateSolAddress(curr.address);
            if (!isValidAddress) {
                invalidCount++;
                setError(`royaltySplit.${index}.address`, {
                    message: "invalidAddress",
                });
                return;
            }

            return validateSolAddress(curr.address);
        });

        if (invalidCount) {
            return;
        }

        const royaltySum = royaltySplit.reduce(
            (final, curr) => final + Number(curr.split),
            0
        );

        if (royaltySum !== 100) {
            toast.error(
                `Total of royalty split should be 100, currently it's ${royaltySum}`
            );
            return;
        }

        onNext(data);
    };

    const sectionHeading =
        type !== "create" ? `${type} Collection` : "Generate Collection";
    const primaryText = type !== "create" ? null : "Step 1";

    return (
        <div>
            <SectionHeader
                heading={sectionHeading}
                primaryText={primaryText}
                rightIcon={
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: rubiks,
                            rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice",
                            },
                        }}
                        height={64}
                        width={64}
                    />
                }
            />
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-start w-full space-x-4">
                    <div className="w-1/2">
                        <Input
                            disabled={isViewMode}
                            label="Collection Name"
                            {...register("collectionName", {
                                required: true,
                            })}
                            type="text"
                            placeholder="Enter your collectin name"
                            errorMessage="Collection name is required"
                            error={errors}
                        />
                    </div>
                    <div className="w-1/2">
                        <Input
                            disabled={isViewMode}
                            label="NFT Base Name"
                            errorMessage="NFT base name is required"
                            error={errors}
                            {...register("nftBaseName", {
                                required: true,
                            })}
                            type="text"
                            placeholder="Enter your NFT base name"
                        />
                    </div>
                </div>
                <div>
                    <Input
                        disabled={isViewMode}
                        label="NFT Description"
                        type="text"
                        multiline
                        errorMessage="NFT Description is required"
                        error={errors}
                        {...register("nftDescription", {
                            required: true,
                        })}
                        placeholder="Enter your collection description"
                    />
                </div>
                <div className="flex items-start w-full space-x-4">
                    <div className="w-1/2">
                        <Input
                            disabled={isViewMode}
                            label="Collection Symbol"
                            type="text"
                            errorMessage="Collection symbol is required"
                            error={errors}
                            {...register("collectionSymbol", {
                                required: true,
                            })}
                            placeholder="Enter your collection symbol"
                        />
                    </div>
                    <div className="w-1/2">
                        <Input
                            disabled={isViewMode}
                            label="Royalty points"
                            type="number"
                            errorMessage="Royalties is required"
                            error={errors}
                            step="0.001"
                            {...register("royalty", {
                                required: true,
                            })}
                            placeholder="Royalty points on secondary"
                        />
                    </div>
                </div>
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="flex items-start w-full space-x-4"
                    >
                        <div className="w-10/12">
                            <Input
                                disabled={isViewMode}
                                label="Royalties split"
                                type="text"
                                placeholder="Enter address for split"
                                {...register(`royaltySplit.${index}.address`, {
                                    required: true,
                                })}
                                error={{
                                    [`royaltySplit.${index}.address`]:
                                        errors["royaltySplit"]?.[index]?.[
                                            "address"
                                        ],
                                }}
                                errorMessage="Address is required"
                            />
                        </div>
                        <div className="w-2/12">
                            <Input
                                disabled={isViewMode}
                                label="Percentage"
                                type="number"
                                placeholder="10%"
                                {...register(`royaltySplit.${index}.split`)}
                            />
                        </div>
                        {!isViewMode && (
                            <TrashIcon
                                onClick={() => remove(index)}
                                className="h-6 w-6 ml-4 text-red-400 mt-9 cursor-pointer"
                            />
                        )}
                    </div>
                ))}
                {!isViewMode && (
                    <Button
                        variant="secondary"
                        onClick={() =>
                            append({
                                address: "",
                                split: 0,
                            })
                        }
                    >
                        <PlusIcon className="h-4 w-4 mr-2" /> Add royalty split
                    </Button>
                )}
                <div className="">
                    <Input
                        disabled={isViewMode}
                        label="Number of NFTs"
                        type="number"
                        {...register("totalSupply", {
                            required: true,
                        })}
                        placeholder="Royalty points on secondary"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Link href={routes.Home}>
                        <Button
                            loading={loading}
                            disabled={loading}
                            variant="secondary"
                            type="reset"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-2" /> Go back
                        </Button>
                    </Link>
                    {!!onNext && (
                        <Button
                            loading={loading}
                            disabled={loading}
                            type="submit"
                        >
                            {nextText}{" "}
                            <ArrowRightIcon className="h-4 w-4 ml-2" />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UploadDetails;
