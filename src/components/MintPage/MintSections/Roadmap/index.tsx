import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import React from "react";
import { Roadmap, RoadmapItem } from "../../../../../contracts/Mint";
import Button from "../../../Button";
import Input from "../../../Input";

const RoadmapSection: React.FC<{
    roadmapSection: Roadmap;
    updateRoadmap: (theme: Roadmap) => void;
}> = ({ roadmapSection, updateRoadmap }) => {
    const handleRoadmapUpdate = (themeName: keyof Roadmap) => (value: any) => {
        const updatedRoadmap: Roadmap = {
            ...roadmapSection,
            [themeName]: value.target.value,
        };

        updateRoadmap(updatedRoadmap);
    };

    const handleAddRoadmap = () => {
        const newRoadmap: Roadmap = {
            ...roadmapSection,
            roadmaps: [...roadmapSection.roadmaps, new RoadmapItem()],
        };
        updateRoadmap(newRoadmap);
    };

    const handleRoadmapSteps =
        (index: number) => (key: keyof RoadmapItem) => (event: any) => {
            console.log({ index, key, event: event.target.value });
            const roadmapSteps: RoadmapItem[] = [...roadmapSection.roadmaps];
            roadmapSteps[index][key] = event.target.value;

            updateRoadmap({
                ...roadmapSection,
                roadmaps: [...roadmapSteps],
            });
        };
    const handleDelete = (index: number) => {
        const roadmapSteps: RoadmapItem[] = roadmapSection.roadmaps.filter(
            (_, i) => i !== index
        );

        updateRoadmap({
            ...roadmapSection,
            roadmaps: [...roadmapSteps],
        });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div>Heading Text</div>
                <Input
                    value={roadmapSection.title}
                    onChange={handleRoadmapUpdate("title")}
                    placeholder="Add 1-liner about your project"
                />
            </div>
            <div className="space-y-2">
                <div>Paragraph Text</div>
                <Input
                    value={roadmapSection.subtitle}
                    onChange={handleRoadmapUpdate("subtitle")}
                    placeholder="Add little detail about your project"
                    multiline
                />
            </div>
            {roadmapSection.roadmaps.map((roadmap, index) => (
                <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span>Roadmap {index + 1}</span>
                        <TrashIcon
                            onClick={() => handleDelete(index)}
                            className=" h-6 w-6 text-red-400 cursor-pointer"
                        />
                    </div>
                    <Input
                        value={roadmap.title}
                        onChange={handleRoadmapSteps(index)("title")}
                        placeholder="Roadmap heading"
                    />

                    <Input
                        value={roadmap.subtitle}
                        onChange={handleRoadmapSteps(index)("subtitle")}
                        placeholder="Roadmap details"
                        multiline
                    />
                </div>
            ))}

            <Button onClick={handleAddRoadmap} fullWidth variant="secondary">
                Add Roadmap <PlusIcon className="h-4 w-4 ml-2" />
            </Button>
        </div>
    );
};

export default RoadmapSection;
