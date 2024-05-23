/* This example requires Tailwind CSS v2.0+ */
import { Fragment, ReactNode, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React from "react";
import Select, { SelectProps } from "rc-select";
// import './index.css';

export interface IOptions {
    id: string;
    name: string | ReactNode;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface Props extends SelectProps<string> {
    readonly values: IOptions[];
    readonly value?: any;
    readonly label?: string;
    readonly placeholder?: string;
    readonly className?: string;
    readonly onChange: (value: string) => void;
    readonly defaultOptions?: IOptions[];
    readonly search?: boolean;
}

const CustomSelect: React.FC<Props> = React.forwardRef(
    (
        {
            values = [],
            value,
            onChange,
            label,
            placeholder,
            className,
            defaultOptions,
            search,
            ...props
        },
        ref
    ) => {
        const noContents = !values.length;

        return (
            <Select
                {...props}
                dropdownClassName={`z-10 ${props.dropdownClassName} ${
                    noContents ? "h-12" : ""
                } shadow-lg`}
                className={`bg-white cursor-pointer h-10 ${className}`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => e && onChange(e)}
                notFoundContent={
                    <div className="flex flex-col items-center h-12 justify-between">
                        <span className="my-2">No options available</span>
                    </div>
                }
            >
                {values.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                        {item.name}
                    </Select.Option>
                ))}
            </Select>
        );
    }
);
export default CustomSelect;
