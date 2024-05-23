import React from "react";
import { useState } from "react";
import { ChromePicker } from "react-color";

const ReactColor: React.FC<{
    readonly selectedColor: string;
    readonly onChange: (value: string) => void;
    readonly text: string;
}> = ({ selectedColor, onChange, text }) => {
    const handleChange = (value: any) => {
        console.log({ value: value.hex });
        onChange(value.hex);
    };

    const [visible, setVisibility] = useState<boolean>(false);

    return (
        <div className="cursor-pointer bg-secondaryButtonBackground rounded-md relative mt-1 text-md text-gray-500 justify-between items-center flex">
            <span>{text}</span>
            <div className="flex items-center p-1 rounded-md">
                <span className="mx-4 text-white">{selectedColor}</span>
                <span
                    className="h-6 w-6 rounded-md cursor-pointer"
                    style={{ background: selectedColor }}
                    onClick={() => setVisibility(!visible)}
                />
                {visible ? (
                    <div className=" absolute right-0 z-10 top-1">
                        <div
                            className="fixed top-0 right-0 left-0 bottom-0"
                            onClick={() => setVisibility(false)}
                        />
                        <ChromePicker
                            onChange={handleChange}
                            color={selectedColor}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ReactColor;
