import React from "react";
import ImageUploading from "react-images-uploading";

const ImageUploader = ({ images, onChange, loading, size = "lg" }) => {
    const imgSize = size === "lg" ? "36" : "24";

    return (
        <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                onImageRemove,
                isDragging,
                dragProps,
            }) => (
                <div className="upload__image-wrapper w-full">
                    {!imageList.length ? (
                        <>
                            <div className="bg-secondaryBackground border-2 rounded-md p-2 border-dashed border-secondaryButtonBackground  w-full h-full mt-1 sm:mt-0 sm:col-span-2">
                                <div className="flex justify-center rounded-md w-full">
                                    {loading ? (
                                        <svg
                                            className={`my-8 animate-spin h-7 w-7 text-white`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                stroke-width="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="text-sm text-gray-600 flex flex-col justify-center items-center w-full">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium"
                                                >
                                                    <button
                                                        style={
                                                            isDragging
                                                                ? {
                                                                      color: "red",
                                                                  }
                                                                : undefined
                                                        }
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                        type="button"
                                                        className="p-1"
                                                    >
                                                        Click or Drop here
                                                    </button>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPEG, or WEBP
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full p-2 flex justify-center items-center">
                            {imageList.map((image, index) => (
                                <div
                                    key={index}
                                    className="w-full flex flex-col justify-center items-center"
                                >
                                    <img
                                        src={image["data_url"]}
                                        alt=""
                                        className={`w-${imgSize} h-${imgSize}`}
                                    />
                                    <div className="image-item__btn-wrapper my-2">
                                        <button
                                            type="button"
                                            onClick={() => onImageRemove(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </ImageUploading>
    );
};

export default ImageUploader;
