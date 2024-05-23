import Link from "next/link";
import React from "react";
import { useUser } from "../../../context";
import { routes } from "../../utils/routes";
import Button from "../Button";

const Header = () => {
    const { user, darkMode, setDarkMode } = useUser();

    return (
        <div className="h-16 flex items-center justify-between px-4 md:px-4 lg:px-20 xl:px-56 2xl:px-80 z-10 bg-headerBackground header-max-width mx-auto">
            <Link href={routes.Home}>
                <img src="/landing.png" className=" cursor-pointer h-14 w-14" />
            </Link>
            <div className="flex items-center space-x-4">
                {!!user ? (
                    <div className="flex items-center space-x-4">
                        <div className="bg-secondaryBackground py-2 pr-4 pl-2 rounded-full flex items-center space-x-4">
                            <div className="bg-primaryText text-primaryBackground rounded-full h-6 w-6 flex items-center justify-center capitalize text-sm">
                                {user?.email?.[0]}
                            </div>
                            <div className="text-sm">{user?.email}</div>
                        </div>
                    </div>
                ) : (
                    <Link href={routes.Login}>
                        <Button>Login</Button>
                    </Link>
                )}
                {/* {darkMode ? (
                    <div onClick={() => setDarkMode(false)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    </div>
                ) : (
                    <div onClick={() => setDarkMode(true)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Header;
