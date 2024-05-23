import React from "react";

const FAQCollapse = ({ title, subtitle, currentTheme }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-2 border-publicSubheadingText px-6 py-4 rounded-md text-xl">
            <div
                onClick={() => setIsOpen((open) => !open)}
                className="flex items-center justify-between cursor-pointer"
            >
                <span className="text-publicHeadingText">{title}</span>
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${
                            isOpen ? "rotate-180" : ""
                        } text-publicHeadingText`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </span>
            </div>
            {isOpen && (
                <div className="mt-4 text-sm text-publicSubheadingText">
                    {subtitle}
                </div>
            )}
        </div>
    );
};

export default FAQCollapse;
