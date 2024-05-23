import React, { InputHTMLAttributes, ReactElement } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const Input: React.FC<
    InputHTMLAttributes<any> & {
        readonly label?: string;
        readonly error?: Record<any, any>;
        readonly errorMessage?: string;
        readonly containerClassName?: string;
        readonly multiline?: boolean;
        readonly prefixIcon?: ReactElement;
        readonly publicInput?: boolean;
        readonly suffixText?: string;
        readonly superScript?: string;
    }
> = React.forwardRef(
    (
        {
            label,
            error,
            errorMessage,
            containerClassName,
            multiline,
            prefixIcon,
            publicInput,
            suffixText,
            superScript,
            ...props
        },
        ref
    ) => {
        const isError = props.name && !!error?.[props.name];

        const color = isError ? "red" : "gray";

        return (
            <>
                {label && (
                    <label
                        htmlFor={props.name}
                        className={`block text-sm font-medium text-gray-500 mb-2`}
                    >
                        {label}
                        {superScript && <sup>{superScript}</sup>}
                    </label>
                )}
                <div
                    className={`relative rounded-md shadow-sm ${containerClassName}`}
                >
                    {multiline ? (
                        <textarea
                            rows={4}
                            id={props.name}
                            ref={ref as any}
                            {...props}
                            className={`w-full ${
                                props.className
                            } border-2 block pr-10 border-${color}-300 focus:${
                                publicInput
                                    ? "border-publicPrimaryColor bg-transparen public-border text-publicPrimaryTextColorborder-publicBorderColor "
                                    : "shadow-sm block w-full bg-secondaryBackground rounded-md border-none font-satoshi p-4"
                            } sm:text-sm rounded-md`}
                        />
                    ) : (
                        <div className="flex items-center">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    {!!prefixIcon && prefixIcon}
                                </div>
                                <input
                                    id={props.name}
                                    ref={ref as any}
                                    {...props}
                                    className={`w-full ${
                                        props.className
                                    } h-12 border-2 block pl-4 ${
                                        !!error ? "pr-10" : "pr-4"
                                    } border-${color}-300 focus:${
                                        publicInput
                                            ? "border-publicPrimaryColor bg-transparent public-border text-publicPrimaryTextColor border-publicBorderColor "
                                            : "shadow-sm block w-full bg-secondaryBackground rounded-md border-none font-satoshi p-4 "
                                    } sm:text-sm ${
                                        suffixText
                                            ? " rounded-l-md "
                                            : "rounded-md"
                                    } ${prefixIcon ? "pl-8" : "pl-4"}`}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    {isError && (
                                        <ExclamationCircleIcon
                                            className="h-5 w-5 text-red-400"
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                            </div>
                            {suffixText && (
                                <span className="px-2 h-10 border-2 border-l-0 border-gray-300 bg-gray-50 flex items-center text-center rounded-r-md">
                                    {suffixText}
                                </span>
                            )}
                        </div>
                    )}
                </div>
                {isError && (
                    <p className="mt-2 text-sm text-red-400" id="email-error">
                        {props.name && !!error?.[props.name]?.message
                            ? error?.[props.name]?.message
                            : errorMessage}
                    </p>
                )}
            </>
        );
    }
);

export default Input;
