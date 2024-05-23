import { CollectionDetails } from "./../contracts/Generate";
import { loadImage } from "canvas";
import sha1 from "sha1";

const DNA_DELIMITER = "-";

export const DIMENSIONS = 1024;
export const createDna = (_layers) => {
    let randNum = [];
    _layers.forEach((layer) => {
        var totalWeight = 0;
        layer.elements.forEach((element) => {
            totalWeight += element.weight;
        });
        // number between 0 - totalWeight
        let random = Math.floor(Math.random() * totalWeight);
        for (var i = 0; i < layer.elements.length; i++) {
            // subtract the current weight from the random weight until we reach a sub zero value.
            random -= layer.elements[i].weight;
            if (random < 0) {
                return randNum.push(
                    `${layer.elements[i].id}:${layer.elements[i].filename}${
                        layer.bypassDNA ? "?bypassDNA=true" : ""
                    }`
                );
            }
        }
    });
    return randNum.join(DNA_DELIMITER);
};

export const isDnaUnique = (_DnaList = new Set(), _dna = "") => {
    const _filteredDNA = filterDNAOptions(_dna);
    return !_DnaList.has(_filteredDNA);
};

export const filterDNAOptions = (_dna) => {
    const dnaItems = _dna.split(DNA_DELIMITER);
    const filteredDNA = dnaItems.filter((element) => {
        const query = /(\?.*$)/;
        const querystring = query.exec(element);
        if (!querystring) {
            return true;
        }
        const options = querystring[1].split("&").reduce((r, setting) => {
            const keyPairs = setting.split("=");
            return { ...r, [keyPairs[0]]: keyPairs[1] };
        }, []);

        return (options as any).bypassDNA;
    });

    return filteredDNA.join(DNA_DELIMITER);
};

export const constructLayerToDna = (_dna = "", _layers = []) => {
    let mappedDnaToLayers = _layers.map((layer, index) => {
        console.log({ layer, dna: _dna.split(DNA_DELIMITER) });
        let selectedElement = layer.elements.find(
            (e) => e.id == cleanDna(_dna.split(DNA_DELIMITER)[index])
        );
        return {
            name: layer.name,
            blend: layer.blend,
            opacity: layer.opacity,
            selectedElement: selectedElement,
        };
    });
    return mappedDnaToLayers;
};

export const cleanDna = (_str) => {
    console.log({ _str });
    const withoutOptions = removeQueryStrings(_str);
    var dna = Number(withoutOptions.split(":").shift());
    return dna;
};

export const removeQueryStrings = (_dna) => {
    const query = /(\?.*$)/;
    return _dna.replace(query, "");
};

export const loadLayerImg = async (_layer) => {
    try {
        return new Promise(async (resolve) => {
            const image = await loadImage(`${_layer.selectedElement.image}`);
            resolve({ layer: _layer, loadedImage: image });
        });
    } catch (error) {
        console.error("Error loading image:", error);
    }
};

export const drawBackground = (ctx) => {
    ctx.fillStyle = background.default;
    ctx.fillRect(0, 0, DIMENSIONS, DIMENSIONS);
};

export const background = {
    generate: true,
    brightness: "80%",
    static: false,
    default: "#023200",
};

export const drawElement = (
    _renderObject,
    _index,
    _layersLen,
    ctx,
    attributes
) => {
    ctx.globalAlpha = _renderObject.layer.opacity;
    ctx.globalCompositeOperation = _renderObject.layer.blend;
    ctx.drawImage(_renderObject.loadedImage, 0, 0, DIMENSIONS, DIMENSIONS);
    let selectedElement = _renderObject.layer.selectedElement;
    attributes.push({
        trait_type: _renderObject.layer.name,
        value: selectedElement.name,
    });
};

const namePrefix = "Your Collection";
const description = "Remember to replace this description";
const baseUri = "ipfs://NewUriToReplace";

export const addMetadata = (
    _dna,
    _edition,
    attributes,
    collectionData = {}
) => {
    let dateTime = Date.now();
    const extraMetadata = {};

    const {
        collectionName,
        collectionSymbol,
        nftDescription,
        royalty,
        royaltySplit,
    } = collectionData as CollectionDetails;

    const creators = (royaltySplit ?? []).map((creator) => ({
        address: creator.address,
        share: creator.split,
        verified: 0,
    }));

    return {
        //Added metadata for solana
        name: collectionName ?? "Test Name",
        symbol: collectionSymbol ?? "SYMBOL",
        description: nftDescription ?? "Description",
        //Added metadata for solana
        seller_fee_basis_points: royalty,
        image: `${_edition}.png`,
        //Added metadata for solana
        external_url: "https://google.com",
        edition: _edition,
        ...extraMetadata,
        attributes,
        properties: {
            files: [
                {
                    uri: `${_edition}.png`,
                    type: "image/png",
                },
            ],
            category: "image",
            creators,
        },
    };
};
