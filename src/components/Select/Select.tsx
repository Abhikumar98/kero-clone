/* This example requires Tailwind CSS v2.0+ */
import { Fragment, ReactNode, ReactText, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

interface ISelectOption {
    readonly label: ReactText | ReactNode;
    readonly value: string;
    readonly className?: string;
}

interface ISelect {
    readonly value: ReactText;
    readonly onChange: (value: ReactText) => void;
    readonly list: ISelectOption[];
}

const Select: React.FC<ISelect> = ({ value, onChange, list }) => {
    const selectedValue = list?.find((item) => item.value === value);

    console.log({ value, list });

    return (
        <Listbox value={selectedValue} onChange={(e) => onChange(e.value)}>
            {({ open }) => (
                <>
                    <div className="mt-1 relative">
                        <Listbox.Button className="bg-secondaryButtonBackground px-5 py-2 rounded-md relative w-full shadow-sm pr-10 text-left cursor-pointer focus:outline-none">
                            <span className="block truncate">
                                {selectedValue?.label}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {list.map((person) => (
                                    <Listbox.Option
                                        key={person.value}
                                        className={({ active }) =>
                                            classNames(
                                                active
                                                    ? "text-white bg-indigo-600"
                                                    : "text-gray-900",
                                                "cursor-default select-none relative py-2 pl-3 pr-9"
                                            )
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={classNames(
                                                        selected
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                        "block truncate",
                                                        person.className
                                                    )}
                                                >
                                                    {person.label}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active
                                                                ? "text-white"
                                                                : "text-indigo-600",
                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
};

export default Select;
