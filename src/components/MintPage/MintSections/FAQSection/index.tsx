import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import React from "react";
import {
    Faq,
    FaqItem,
    Roadmap,
    RoadmapItem,
    Team,
    TeamMember,
} from "../../../../../contracts/Mint";
import Button from "../../../Button";
import Input from "../../../Input";

const FAQSection: React.FC<{
    faqSection: Faq;
    updateFaq: (theme: Faq) => void;
}> = ({ faqSection, updateFaq }) => {
    const handleRoadmapUpdate = (themeName: keyof Roadmap) => (value: any) => {
        const updatedRoadmap: Faq = {
            ...faqSection,
            [themeName]: value.target.value,
        };

        updateFaq(updatedRoadmap);
    };

    const handleAddRoadmap = () => {
        const newRoadmap: Faq = {
            ...faqSection,
            faqs: [...faqSection.faqs, new FaqItem()],
        };
        updateFaq(newRoadmap);
    };

    const handleRoadmapSteps =
        (index: number) => (key: keyof RoadmapItem) => (event: any) => {
            console.log({ index, key, event: event.target.value });
            const teamMembers: FaqItem[] = [...faqSection.faqs];
            teamMembers[index][key] = event.target.value;

            updateFaq({
                ...faqSection,
                faqs: [...teamMembers],
            });
        };
    const handleDelete = (index: number) => {
        const roadmapSteps: FaqItem[] = faqSection.faqs.filter(
            (_, i) => i !== index
        );

        updateFaq({
            ...faqSection,
            faqs: [...roadmapSteps],
        });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div>Heading Text</div>
                <Input
                    value={faqSection.title}
                    onChange={handleRoadmapUpdate("title")}
                    placeholder="Add 1-liner about your project"
                />
            </div>
            <div className="space-y-2">
                <div>Paragraph Text</div>
                <Input
                    value={faqSection.subtitle}
                    onChange={handleRoadmapUpdate("subtitle")}
                    placeholder="Add little detail about your project"
                    multiline
                />
            </div>
            {faqSection.faqs.map((member, index) => (
                <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span>FAQ {index + 1}</span>
                        <TrashIcon
                            onClick={() => handleDelete(index)}
                            className=" h-6 w-6 text-red-400 cursor-pointer"
                        />
                    </div>
                    <Input
                        value={member.title}
                        onChange={handleRoadmapSteps(index)("title")}
                        placeholder="FAQ title"
                    />

                    <Input
                        value={member.subtitle}
                        onChange={handleRoadmapSteps(index)("subtitle")}
                        placeholder="FAQ Description"
                        multiline
                    />
                </div>
            ))}

            <Button onClick={handleAddRoadmap} fullWidth variant="secondary">
                Add FAQ <PlusIcon className="h-4 w-4 ml-2" />
            </Button>
        </div>
    );
};

export default FAQSection;
