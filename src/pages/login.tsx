import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ironOptions } from "../../config";
import Button from "../components/Button";
import Input from "../components/Input";
import { routes } from "../utils/routes";

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
    if ((req.session as any).auth) {
        return {
            props: {
                hideHeader: false,
                skipAuth: true,
            },
            redirect: {
                destination: routes.Home,
            },
        };
    }

    return {
        props: {
            hideHeader: true,
            skipAuth: true,
        },
    };
}, ironOptions);

const Login = () => {
    const router = useRouter();

    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = React.useState("");
    const [code, setCode] = React.useState("");
    const [loading, setLoading] = useState(false);

    const sendOTP = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("/api/auth/otp", {
                email,
            });

            setStep("otp");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        try {
            if (!code) {
                toast.error("Please enter the OTP code");
                return;
            }
            setLoading(true);

            await axios.post("/api/auth/login", {
                email,
                code,
            });

            router.push(routes.Home);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const goBack = async () => {
        setStep("email");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="h-96 w-96">
                {step === "email" ? (
                    <form
                        onSubmit={sendOTP}
                        className="flex items-center justify-center flex-col space-y-4"
                    >
                        {/* <form> */}
                        <div>
                            <img
                                src="/images/logo.png"
                                className=" cursor-pointer"
                            />
                        </div>
                        <div className="uppercase text-xl">
                            Welcome to keroverse
                        </div>
                        <div className=" text-secondaryText">
                            Enter your email to continue
                        </div>
                        <div className="w-full">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            loading={loading}
                            fullWidth
                            onClick={sendOTP}
                        >
                            Continue <ArrowRightIcon className="h-4 w-4 ml-2" />
                        </Button>
                        {/* </> */}
                    </form>
                ) : (
                    // </form>
                    <form
                        onSubmit={verifyOTP}
                        className="flex items-center justify-center flex-col space-y-4"
                    >
                        <div className="w-full">
                            <div
                                className="mb-8 flex items-center cursor-pointer"
                                onClick={goBack}
                            >
                                <ArrowLeftIcon className="h-4 w-4 mr-2" />{" "}
                                <span>Back</span>
                            </div>
                            <Input
                                label="Enter the OTP"
                                placeholder="1234"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <div className="text-xs text-secondaryText my-2">
                                Please check your email for otp
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <Button
                                type="submit"
                                loading={loading}
                                onClick={verifyOTP}
                                fullWidth
                            >
                                Login{" "}
                                <ArrowRightIcon className="h-4 w-4 ml-2" />{" "}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
