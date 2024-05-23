import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../contracts/User";

class AppState {
    user: User | null = null;
    kerobotOwner: boolean;
    setUser: (user: User | null) => void;
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

const AppContext = createContext<AppState>(new AppState());

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [kerobotOwner, setKerobotOwner] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    console.log({ user });

    const updatedDarkMode = (newMode: boolean) => {
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode ? "true" : "false");
    };

    // const fetchLoggedInUser = async () => {
    //     try {
    //         const response = await axios.get(`/api`);
    //         setUser(response.data?.user);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     if (!user?.id) {
    //         fetchLoggedInUser();
    //     }
    // }, []);

    useEffect(() => {
        const darkModeCache = localStorage.getItem("darkMode");
        updatedDarkMode(darkModeCache === "true");
    }, []);

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                kerobotOwner,
                darkMode,
                setDarkMode: updatedDarkMode,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useUser = () => {
    const user = useContext(AppContext);
    if (!user) {
        throw new Error("Hook called outside Contrxt Provider");
    }
    return user;
};
