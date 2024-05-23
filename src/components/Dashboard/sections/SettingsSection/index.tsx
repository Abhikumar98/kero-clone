import React, { useEffect } from "react";
import Lottie from "react-lottie";
import SecondarySection from "../../../SecondarySection";
import rocket from "../../../../../lottie/rocket.json";
import Input from "../../../Input";
import { useUser } from "../../../../../context";

const SettingsSection = () => {
    const { user } = useUser();
    const [email, setEmail] = React.useState(user?.email ?? "");

    useEffect(() => {
        setEmail(user?.email);
    }, [user]);

    return (
        <div>
            <div>
                <SecondarySection
                    rightIcon={
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: rocket,
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice",
                                },
                            }}
                            height={64}
                            width={64}
                        />
                    }
                    heading={"Settings"}
                    primaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                />
            </div>
            <div className="flex items-center w-full space-x-4">
                <div className="w-1/2">
                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="w-1/2">
                    <Input
                        label="Email address"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsSection;
