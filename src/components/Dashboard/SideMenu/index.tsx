import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useMoralis } from "react-moralis";
import { routes } from "../../../utils/routes";
import Button from "../../Button";

const SideMenu = () => {
    const router = useRouter();
    const {
        authenticate,
        isAuthenticated,
        user,
        isAuthenticating,
        logout: walletLogout,
    } = useMoralis();

    const handleSectionChange = (section: string) => {
        router.push(`${routes.Home}?section=${section}`, undefined, {
            shallow: true,
        });
    };

    const disconnectWallet = async () => {
        await walletLogout();
    };

    const logout = async () => {
        try {
            await axios.get(`/api/auth/logout`);
            router.push(routes.Login);
        } catch (error) {
            console.error(error);
        }
    };

    const connectWallet = async () => {
        try {
            await authenticate({
                type: "sol",
                signingMessage: "Connect your wallet with Keroverse",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const active = router.query.section ?? "generate";

    return (
        <div className=" w-64">
            <div className="space-y-4">
                {isAuthenticated ? (
                    <div className="flex items-center space-x-4">
                        <div
                            className={`bg-secondaryBackground px-5 py-2 rounded-md truncate text-gradient`}
                        >
                            {user?.get("solAddress") ?? ""}
                        </div>
                        <div
                            className="text-xs cursor-pointer hover:text-red-400"
                            onClick={disconnectWallet}
                        >
                            Disconnect
                        </div>
                    </div>
                ) : (
                    <Button
                        fullWidth
                        loading={isAuthenticating}
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </Button>
                )}

                {/* <div
                    onClick={() => handleSectionChange("dashboard")}
                    className={` ${
                        active === "dashboard"
                            ? " bg-secondaryButtonBackground"
                            : " hover:bg-secondaryButtonBackground hover:opacity-80 "
                    } px-5 py-2 rounded-md cursor-pointer`}
                >
                    My Dashboard
                </div> */}
                <div
                    onClick={() => handleSectionChange("generate")}
                    className={` ${
                        active === "generate"
                            ? " bg-secondaryButtonBackground"
                            : " hover:bg-secondaryButtonBackground hover:opacity-80 "
                    } px-5 py-2 rounded-md cursor-pointer`}
                >
                    Generate Collection
                </div>
                {/* <div
                    onClick={() => handleSectionChange("launched")}
                    className={` ${
                        active === "launched"
                            ? " bg-secondaryButtonBackground"
                            : " hover:bg-secondaryButtonBackground hover:opacity-80 "
                    } px-5 py-2 rounded-md cursor-pointer`}
                >
                    Launch Collection
                </div> */}
                {/* <div
                    onClick={() => handleSectionChange("settings")}
                    className={` ${
                        active === "settings"
                            ? " bg-secondaryButtonBackground"
                            : " hover:bg-secondaryButtonBackground hover:opacity-80 "
                    } px-5 py-2 rounded-md cursor-pointer`}
                >
                    Settings
                </div> */}
                <div
                    onClick={logout}
                    className={`hover:bg-secondaryButtonBackground px-5 py-2 rounded-md cursor-pointer flex items-center`}
                >
                    <span>Logout</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 ml-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
