import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie";
import { LaunchCollection } from "../../../../contracts/Launchpad";
import rocket from "../../../../lottie/rocket.json";
import { routes } from "../../../utils/routes";
import Button from "../../Button";
import Input from "../../Input";
import SectionHeader from "../../SectionHeader";

const CMConfig: React.FC<{
    collection: LaunchCollection;
}> = ({ collection }) => {
    const [loading, setLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
    } = useForm();

    const onSubmit = (data: any) => {
        console.log({ data });
    };

    const sectionHeading = "Add mint details";
    const primaryText = "Step 3";

    return (
        <div className="w-11/12 md:w-5/6 lg:w-full xl:w-2/3 mx-auto space-y-4">
            <div>
                <Link href={routes.Home}>
                    <Button loading={loading} variant="ghost" type="reset">
                        <ArrowLeftIcon className="h-4 w-4 mr-2" /> Go back
                    </Button>
                </Link>
            </div>
            <SectionHeader
                heading={sectionHeading}
                primaryText={primaryText}
                rightIcon={
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: rocket,
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
                            label="Price in SOL"
                            {...register("price", {
                                required: true,
                            })}
                            type="number"
                            placeholder="10 SOL"
                            errorMessage="Price for collection is required"
                            error={errors}
                        />
                    </div>
                    <div className="w-1/2">
                        <Input
                            label="Number of NFTs"
                            errorMessage="Number of NFTs is required"
                            error={errors}
                            {...register("totalSupply", {
                                required: true,
                            })}
                            type="number"
                            placeholder="Enter total supply of NFTs"
                        />
                    </div>
                </div>
                <div>
                    <Input
                        label="Solana Treasury Address"
                        type="text"
                        errorMessage="Solana Treasury Address is required"
                        error={errors}
                        {...register("treasuryAddress", {
                            required: true,
                        })}
                        placeholder="Enter Treasury address"
                    />
                </div>
                <div className="">
                    <Input
                        label="Retain Authority"
                        type="text"
                        {...register("retainAuthority", {
                            required: true,
                        })}
                        placeholder="Retain authority"
                    />
                </div>
                <div className="">
                    <Input
                        label="Is Mutable"
                        type="text"
                        {...register("isMutable", {
                            required: true,
                        })}
                        placeholder="Is mutable"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Button loading={loading} type="submit" fullWidth>
                        Create Candy Machine
                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CMConfig;
