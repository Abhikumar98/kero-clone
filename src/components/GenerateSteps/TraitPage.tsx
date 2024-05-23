import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import Lottie from "react-lottie";
import {
    CollectionDetails,
    GenerationData,
    Layer,
} from "../../../contracts/Generate";
import rubiks from "../../../lottie/rubiks.json";
import Button from "../Button";
import SectionHeader from "../SectionHeader";
import TraitBar from "./TraitBar";

declare module "react" {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        // extends React's HTMLAttributes
        directory?: string;
        webkitdirectory?: string;
        mozdirectory?: string;
    }
}

interface ITraitsPage {
    readonly onNext: () => void;
    readonly onBack: () => void;
    readonly setGenerationData: (data: GenerationData) => void;
    readonly files: File[];
    readonly setFiles: (files: File[]) => void;
    readonly layers: Layer[];
    readonly setLayers: (layers: Layer[]) => void;
    readonly collectionDetails: CollectionDetails;
}

const TraitsPage: React.FC<ITraitsPage> = ({
    onNext,
    onBack,
    setGenerationData,
    files,
    setFiles,
    layers,
    setLayers,
    collectionDetails,
}) => {
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleFolderUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { files } = e.target;
        const uploadedFiles = [
            ...Object.values(files ?? {}).filter(
                (f) => !f.name.startsWith(".")
            ),
        ];

        const promises = uploadedFiles.map((file) => toBase64(file));
        const data = await Promise.all(promises);

        const updatedFiles = uploadedFiles.map((file, index) => {
            return {
                name: file.name,
                size: file.size,
                type: file.type,
                webkitRelativePath: file.webkitRelativePath,
                image: data[index],
                weight: 0,
            };
        });

        const layers: Layer[] = updatedFiles?.reduce((final, curr) => {
            const layer = curr.webkitRelativePath.split("/")[1];

            const layerIndex = final.findIndex((l) => l.layer === layer);

            if (layerIndex > -1) {
                final[layerIndex] = {
                    ...final[layerIndex],
                    assets: [...final[layerIndex].assets, curr],
                };
            } else {
                final[final.length] = {
                    layer: layer,
                    assets: [curr],
                };
            }

            return final;
        }, []);

        setFiles(uploadedFiles);
        setLayers(layers);
    };

    const updateRarityChange = (
        currLayer: string,
        assetIndex: number,
        value: number
    ) => {
        const updatedLayerDetails = Object.values(layers).map((layer) => {
            if (layer.layer === currLayer) {
                layer.assets[assetIndex].weight = value;
            }

            return layer;
        });

        setLayers(updatedLayerDetails);
    };

    const parentFolder = files?.[0]?.webkitRelativePath?.split("/")[0];

    const handleGeneration = async () => {
        const layerOrder = layers.map((layer) => ({
            name: layer.layer,
        }));

        const layerConfigurations = {
            size: collectionDetails.totalSupply,
            layersOrder: layerOrder,
        };

        const layerSetup = layers.map((layer, index) => {
            const { assets, layer: layerName } = layer;
            return {
                id: index,
                elements: [
                    ...assets.map((element, index) => ({
                        id: index,
                        name: element.name.split(".")[0],
                        filename: element.name,
                        image: element.image,
                        weight: !element.weight
                            ? parseInt((100 / assets.length).toFixed(2))
                            : element.weight,
                    })),
                ],
                name: layerName,
                blend: "source-over",
                opacity: 1,
                bypassDNA: false,
            };
        });
        setGenerationData({
            layerConfigurations,
            layerSetup,
        });

        onNext();
    };

    const reorder = (list, startIndex, endIndex): Layer[] => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    const onDragEnd = (result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items: Layer[] = reorder(
            layers,
            result.source.index,
            result.destination.index
        );
        setLayers(items);
    };

    return (
        <div>
            <SectionHeader
                heading={"Generate Collection"}
                primaryText="Step 2"
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
                {!!files.length ? (
                    <div>
                        <div className="flex flex-col">
                            <img src="/Folder.png" className="h-16 w-20" />
                            {parentFolder}
                        </div>
                        <div className="my-4 text-sm text-secondaryText">
                            Any asset with 0 rarity would be given an even
                            rarity based on the layer
                        </div>
                        <div className="my-4 text-sm text-secondaryText">
                            Layers will be arranged according to current order.
                            <br />
                            First layer would be the bottom most layer.
                        </div>
                        {!!Object.entries(layers).length && (
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="space-y-4 my-4"
                                        >
                                            {layers.map((layer, index) => (
                                                <Draggable
                                                    key={layer.layer
                                                        .split(" ")
                                                        .join("_")}
                                                    draggableId={layer.layer
                                                        .split(" ")
                                                        .join("_")}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="flex items-start w-full"
                                                        >
                                                            <div className="mr-4 mt-4 text-primaryText">
                                                                <svg
                                                                    width="20"
                                                                    height="21"
                                                                    viewBox="0 0 20 21"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-6 w-6 text-primaryText stroke-current"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        clip-rule="evenodd"
                                                                        d="M8.59391 2.35367C7.86251 3.28089 7.28361 4.09062 7.30755 4.15321C7.33851 4.23452 7.6018 4.26693 8.23239 4.26693H9.11391L9.09042 7.06515L9.06693 9.86336L6.28946 9.887L3.51199 9.91064L3.48663 8.99157C3.4691 8.3551 3.4287 8.0725 3.35539 8.0725C3.24914 8.0725 0.23348 10.4293 0.0408414 10.6629C-0.0758096 10.8044 -0.0795467 10.801 1.98841 12.4473C2.69534 13.0102 3.32602 13.4505 3.38982 13.4259C3.47426 13.3933 3.50576 13.1404 3.50576 12.494V11.6069L6.28634 11.6306L9.06693 11.6542L9.09042 14.4493L9.11391 17.2444L8.20063 17.2699C7.57244 17.2874 7.28735 17.3284 7.28735 17.4011C7.28735 17.5101 9.61619 20.5327 9.85181 20.7296C10.0037 20.8563 10.0722 20.7811 11.6735 18.7312C12.2107 18.0434 12.6305 17.4289 12.6064 17.3657C12.5747 17.2827 12.3168 17.2506 11.681 17.2506H10.7995L10.823 14.4524L10.8465 11.6542L13.624 11.6306L16.4014 11.6069L16.4268 12.5187C16.4409 13.0248 16.4917 13.4431 16.5411 13.4588C16.6153 13.4824 17.2772 12.9743 19.7832 10.9697L20 10.7963L19.7832 10.5811C19.2762 10.078 16.6206 8.05423 16.5189 8.09345C16.4402 8.12381 16.4077 8.39647 16.4077 9.02354V9.91064L13.6271 9.887L10.8465 9.86336L10.823 7.06828L10.7995 4.2732L11.7128 4.24768C12.3663 4.22941 12.6261 4.19064 12.6261 4.11113C12.6261 3.99759 10.3797 1.08324 10.0861 0.815775C9.93189 0.675372 9.85723 0.752289 8.59391 2.35367Z"
                                                                        fill="white"
                                                                    />
                                                                </svg>
                                                            </div>

                                                            <div className="w-full">
                                                                <TraitBar
                                                                    key={index}
                                                                    layer={
                                                                        layer.layer
                                                                    }
                                                                    contents={
                                                                        layer.assets
                                                                    }
                                                                    updateRarityChange={
                                                                        updateRarityChange
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        )}
                    </div>
                ) : (
                    <div className="w-full">
                        <label
                            htmlFor="cover-photo"
                            className="block text-primaryText font-satoshi mb-4"
                        >
                            Upload Assets
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="flex justify-center px-6 py-6 border-2 bg-secondaryBackground border-dashed border-secondaryButtonBackground rounded-md font-satoshi">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex flex-col items-center text-sm">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                webkitdirectory=""
                                                mozdirectory=""
                                                onChange={handleFolderUpload}
                                            />
                                        </label>
                                        <p className="text-secondaryText">or</p>
                                        <p className="pb-2 text-secondaryText">
                                            Drag and drop the asset folder
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <div className="flex items-center justify-between space-x-8">
                        <Button onClick={onBack} variant="secondary">
                            <ArrowLeftIcon className="h-4 w-4 mr-2" /> Go back
                        </Button>
                        <Button onClick={handleGeneration}>
                            Generate collection{" "}
                            <ArrowRightIcon className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TraitsPage;
