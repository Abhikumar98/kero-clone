import {
    ArrowLeftIcon,
    ArrowRightIcon,
    SaveIcon,
} from "@heroicons/react/solid";
import axios from "axios";
import { createCanvas } from "canvas";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import { CollectionDetails, GenerationData } from "../../../contracts/Generate";
import { generateSingleNFT } from "../../../generator";
import { createDna, DIMENSIONS, isDnaUnique } from "../../../generator/helpers";
import rubiks from "../../../lottie/rubiks.json";
import { routes } from "../../utils/routes";
import Button from "../Button";
import SectionHeader from "../SectionHeader";
import GeneratedNFT from "./GeneratedNFT";
import JSZip from "jszip";
import { saveAs } from "file-saver";
interface INFTOutput {
    readonly onBack: () => void;
    readonly collectionDetails: CollectionDetails;
    readonly generationData: GenerationData;
}

const NFTOutput: React.FC<INFTOutput> = ({
    onBack,
    collectionDetails,
    generationData,
}) => {
    console.log({ generationData });
    const [loading, setLoading] = useState<boolean>(false);
    const [generatedNFTs, setGeneratedNFTs] = useState([]);
    const router = useRouter();

    const handleDownload = async () => {
        try {
            setLoading(true);
            const zip = new JSZip();
            generatedNFTs.forEach((data, index) => {
                zip.file(
                    `${index}.json`,
                    JSON.stringify(data.metadata, null, 4)
                );
                const base64Data = data.image.replace(
                    /^data:image\/(png|jpg);base64,/,
                    ""
                );
                zip.file(`${index}.png`, base64Data, { base64: true });
            });
            const data = await zip.generateAsync({ type: "blob" });
            saveAs(data, "assets.zip");
            toast.success("Downloaded asset collection");
        } catch (error) {
            console.error(error);
            toast.error(error?.message ?? error);
        } finally {
            setLoading(false);
        }
    };
    const handleSaveCollection = async () => {
        try {
            setLoading(true);
            await handleDownload();
            await axios.post(`/api/generate`, {
                collectionDetails,
            });
            toast.success("Successfully added collection");
            router.push(routes.Home);
        } catch (error) {
            console.error(error);
            toast.error(error?.message ?? error);
        } finally {
            setLoading(false);
        }
    };

    const initiateGeneration = async () => {
        const { layerConfigurations, layerSetup } = generationData;

        const { size } = layerConfigurations;
        console.log({ size });

        const uniqueDnaTorrance = 1000;
        const canvas = createCanvas(DIMENSIONS, DIMENSIONS);
        const ctx = canvas.getContext("2d");
        const dnaList = new Set();
        let layerConfigIndex = 0;
        let editionCount = 1;
        let failedCount = 0;
        let abstractedIndexes = [];

        for (let i = 0; i <= size; i++) {
            abstractedIndexes.push(i);
        }
        while (editionCount <= size) {
            let newDna = createDna(layerSetup);
            if (isDnaUnique(dnaList, newDna)) {
                console.log(layerConfigurations, layerConfigIndex);
                const data = await generateSingleNFT(
                    layerSetup,
                    dnaList,
                    ctx,
                    [layerConfigurations],
                    layerConfigIndex,
                    abstractedIndexes,
                    canvas,
                    newDna,
                    collectionDetails
                );
                editionCount++;
                abstractedIndexes.shift();
                setGeneratedNFTs((prev) => [...prev, data]);
            } else {
                console.log("DNA exists!");
                failedCount++;
                if (failedCount >= uniqueDnaTorrance) {
                    toast.error(
                        `You need more layers or elements to grow your edition to ${size} artworks!`
                    );
                    return;
                }
            }
        }
    };

    useEffect(() => {
        if (generationData) {
            initiateGeneration();
        }
    }, []);

    return (
        <div>
            <SectionHeader
                heading={"Generate Collection"}
                primaryText="Step 3"
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
            <div className="space-y-8">
                <Button
                    onClick={handleSaveCollection}
                    loading={loading}
                    fullWidth
                >
                    Save collection <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Button>
                <div className=" text-center uppercase">or</div>
                <div className="flex items-center justify-between">
                    <Button variant="secondary" onClick={onBack}>
                        <ArrowLeftIcon className="h-4 w-4 mr-2" /> Go back
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleDownload}
                        loading={loading}
                    >
                        Download Asset and Metadata{" "}
                        <SaveIcon className="h-4 w-4 ml-2" />
                    </Button>
                </div>
                <div className="flex flex-wrap">
                    {generatedNFTs?.map((data, i) => (
                        <GeneratedNFT
                            key={i}
                            image={data.image}
                            metadata={data.metadata}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NFTOutput;
