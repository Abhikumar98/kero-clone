import dynamic from "next/dynamic";
import React, { useState } from "react";
import withServerSidePropsAuth from "../../../config/withServerSidePropsAuth";
import {
    CollectionDetails,
    GenerationData,
    Layer,
} from "../../../contracts/Generate";
import TraitPage from "../../components/GenerateSteps/TraitPage";
import UploadDetails from "../../components/GenerateSteps/UploadDetails";
const NFTOutput = dynamic(
    () => import("../../components/GenerateSteps/NFTOutput"),
    {
        ssr: false,
    }
);

export const getServerSideProps = withServerSidePropsAuth(
    async ({ req, res }) => {
        return {
            props: {},
        };
    }
);

const Generate = () => {
    const [step, setStep] = useState<number>(1);
    const [collectionDetails, setCollectionDetails] =
        useState<CollectionDetails>(new CollectionDetails());
    const [generationData, setGenerationData] = useState<GenerationData | null>(
        null
    );
    const [files, setFiles] = useState<File[]>([]);
    const [layers, setLayers] = useState<Layer[]>([]);

    const next = () => setStep(step + 1);
    const back = () => setStep(step - 1);

    const handleAfterUploadNext = (data: CollectionDetails) => {
        setCollectionDetails(data);
        next();
    };
    const handleAfterAssetUpload = () => {
        next();
    };

    return (
        <div className="w-11/12 md:w-5/6 lg:w-full xl:w-2/3 mx-auto">
            {step === 1 && (
                <UploadDetails
                    onNext={handleAfterUploadNext}
                    nextText="Next"
                    type="create"
                    collectionDetails={collectionDetails}
                />
            )}
            {step === 2 && (
                <TraitPage
                    onBack={back}
                    onNext={handleAfterAssetUpload}
                    setGenerationData={setGenerationData}
                    files={files}
                    setFiles={setFiles}
                    layers={layers}
                    setLayers={setLayers}
                    collectionDetails={collectionDetails}
                />
            )}
            {step === 3 && (
                <NFTOutput
                    collectionDetails={collectionDetails}
                    onBack={back}
                    generationData={generationData}
                />
            )}
        </div>
    );
};

export default Generate;
