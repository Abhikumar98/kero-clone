export interface LayerTrait {
    id: number;
    elements: Array<{
        id: number;
        name: string;
        filename: string;
        image: string;
        weight: number;
    }>;
    name: string;
    blend: string;
    opacity: number;
    bypassDNA: boolean;
}
