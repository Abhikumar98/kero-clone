import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import React from "react";
import { storage } from "../../../../../config/firebase/client";
import { Team, TeamMember } from "../../../../../contracts/Mint";
import Button from "../../../Button";
import Input from "../../../Input";
import ImageUploader from "../ImageUploader";

const TeamSection: React.FC<{
    teamSection: Team;
    updateTeam: (theme: Team) => void;
}> = ({ teamSection, updateTeam: updateTeam }) => {
    const initialImages = teamSection.members.map((member) => ({
        data_url: member.image,
    }));

    const [teamImages, setTeamImages] = React.useState(initialImages);
    const [loading, setLoading] = React.useState(false);
    const onChange = async (imageList, index) => {
        if (imageList.length > 0) {
            const { file } = imageList[0];
            setLoading(true);
            const response = await storage
                .ref(`images/${file.name ?? ""}`)
                .put(file);
            console.log({ response });
            const downloadURL = await response.ref.getDownloadURL();
            console.log(
                "🚀 ~ file: index.tsx ~ line 31 ~ handleUpload ~ downloadURL",
                downloadURL
            );
            setLoading(false);
            handleTeamSteps(index)("image")(downloadURL, true);
        } else {
            handleTeamSteps(index)("image")("", true);
        }
        setTeamImages((prev) => [...prev, imageList]);
    };

    const handleTeamUpdate = (themeName: keyof Team) => (value: any) => {
        const updatedTeam: Team = {
            ...teamSection,
            [themeName]: value.target.value,
        };

        updateTeam(updatedTeam);
    };

    const handleAddTeam = () => {
        const newTeam: Team = {
            ...teamSection,
            members: [...teamSection.members, new TeamMember()],
        };
        updateTeam(newTeam);
    };

    const handleTeamSteps =
        (index: number) =>
        (key: keyof TeamMember) =>
        (event: any, isImage?: boolean) => {
            // (isImage?: boolean)
            console.log("here", { key, event, index });

            const teamMembers: TeamMember[] = [...teamSection.members];
            teamMembers[index][key] = isImage ? event : event.target.value;

            updateTeam({
                ...teamSection,
                members: [...teamMembers],
            });
        };
    const handleDelete = (index: number) => {
        const TeamSteps: TeamMember[] = teamSection.members.filter(
            (_, i) => i !== index
        );

        updateTeam({
            ...teamSection,
            members: [...TeamSteps],
        });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div>Heading Text</div>
                <Input
                    value={teamSection.title}
                    onChange={handleTeamUpdate("title")}
                    placeholder="Add 1-liner about your project"
                />
            </div>
            <div className="space-y-2">
                <div>Paragraph Text</div>
                <Input
                    value={teamSection.subtitle}
                    onChange={handleTeamUpdate("subtitle")}
                    placeholder="Add little detail about your project"
                    multiline
                />
            </div>
            {teamSection.members.map((member, index) => (
                <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span>Team Member {index + 1}</span>
                        <TrashIcon
                            onClick={() => handleDelete(index)}
                            className=" h-6 w-6 text-red-400 cursor-pointer"
                        />
                    </div>
                    <div className="flex w-full rounded-md font-satoshi">
                        <div className="space-y-1 text-center w-full">
                            <div className="flex text-sm items-center flex-col w-full">
                                <ImageUploader
                                    images={
                                        member.image
                                            ? [{ data_url: member.image }]
                                            : []
                                    }
                                    onChange={(imageList) =>
                                        onChange(imageList, index)
                                    }
                                    loading={loading}
                                    size="sm"
                                />
                            </div>
                        </div>
                    </div>
                    <Input
                        value={member.title}
                        // onChange={(e) => console.log(e.target.value)}
                        onChange={handleTeamSteps(index)("title")}
                        placeholder="Team member name"
                    />

                    <Input
                        value={member.subtitle}
                        onChange={handleTeamSteps(index)("subtitle")}
                        placeholder="Team member role"
                    />
                </div>
            ))}

            <Button onClick={handleAddTeam} fullWidth variant="secondary">
                Add Member <PlusIcon className="h-4 w-4 ml-2" />
            </Button>
        </div>
    );
};

export default TeamSection;
