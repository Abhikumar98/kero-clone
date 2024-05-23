import axios from "axios";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useUser } from "../../context";
import { darkModeTheme, lightModeTheme } from "../contracts/theme";
import { Theme } from "../utils/theme";

const Wrapper = ({ children, skipAuth }) => {
    const { user, setUser, darkMode } = useUser();

    const fetchLoggedInUser = async () => {
        try {
            const response = await axios.get(`/api`);
            setUser(response.data?.user);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!skipAuth) {
            if (!user?.id) {
                fetchLoggedInUser();
            }
        }
    }, [skipAuth]);

    return (
        <>
            <Theme theme={darkModeTheme} />
            <Toaster /> {children}
        </>
    );
};

export default Wrapper;
