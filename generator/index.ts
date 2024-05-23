import {
    addMetadata,
    background,
    constructLayerToDna,
    DIMENSIONS,
    drawBackground,
    drawElement,
    filterDNAOptions,
    loadLayerImg,
} from "./helpers";

export const generateSingleNFT = async (
    layers,
    dnaList,
    ctx,
    layerConfigurations,
    layerConfigIndex,
    abstractedIndexes,
    canvas,
    newDna,
    collectionDetails
) => {
    console.log({ newDna, layers });
    let results = constructLayerToDna(newDna, layers);
    let loadedElements = [];

    results.forEach((layer) => {
        loadedElements.push(loadLayerImg(layer));
    });

    let data = {};

    await Promise.all(loadedElements).then((renderObjectArray) => {
        ctx.clearRect(0, 0, DIMENSIONS, DIMENSIONS);
        if (background.generate) {
            drawBackground(ctx);
        }
        const attributes = [];
        renderObjectArray.forEach((renderObject, index) => {
            drawElement(
                renderObject,
                index,
                layerConfigurations[layerConfigIndex].layersOrder.length,
                ctx,
                attributes
            );
        });
        const metadata = addMetadata(
            newDna,
            abstractedIndexes[0],
            attributes,
            collectionDetails
        );
        console.log({ metadata });
        data = {
            image: canvas.toDataURL(),
            metadata,
        };
        // saveMetaDataSingleFile(abstractedIndexes[0]);
    });
    return data;
    dnaList.add(filterDNAOptions(newDna));
};
