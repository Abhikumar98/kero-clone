export interface RoyaltySplit {
    address: string;
    split: number;
}

export class CollectionDetails {
    collectionName: string = "";
    nftBaseName: string = "";
    nftDescription: string = "";
    collectionSymbol: string = "";
    royalty: number = 0;
    royaltySplit: RoyaltySplit[] = [];
    totalSupply: number = 1;
    id: string = "";
    userId: string = "";
    assets_hash: string | null = null;
}

export interface Layer {
    layer: string;
    assets: Array<{
        name: string;
        size: number;
        type: string;
        webkitRelativePath: string;
        image: string;
        weight: number;
    }>;
}
export interface GenerationData {
    layerConfigurations: LayerConfigurations;
    layerSetup: LayerSetup[];
}

export interface LayerConfigurations {
    size: number;
    layersOrder: LayersOrder[];
}

export interface LayersOrder {
    name: string;
}

export interface LayerSetup {
    id: number;
    elements: Element[];
    name: string;
    blend: string;
    opacity: number;
    bypassDNA: boolean;
}

export interface Element {
    id: number;
    name: string;
    filename: string;
    image: string;
    weight: number;
}
