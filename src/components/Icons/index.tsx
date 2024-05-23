export const Circle = () => {
    return (
        <svg
            width="33"
            height="34"
            viewBox="0 0 33 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_113_1535)">
                <circle cx="15.7842" cy="16.1695" r="15.2549" fill="#F2F3F7" />
                <circle
                    cx="15.7842"
                    cy="16.1695"
                    r="14.3015"
                    stroke="black"
                    stroke-width="1.90687"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_113_1535"
                    x="0.529297"
                    y="0.914551"
                    width="32.4166"
                    height="32.4166"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dx="1.90687" dy="1.90687" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_113_1535"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_113_1535"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};
