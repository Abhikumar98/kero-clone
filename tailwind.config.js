module.exports = {
    content: [
        "./src/components/**/*.{ts,tsx,js,jsx}",
        "./src/pages/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primaryText: "var(--primaryText)",
                primaryBackground: "var(--primaryBackground)",
                secondaryBackground: "var(--secondaryBackground)",
                headerBackground: "var(--headerBackground)",
                secondaryButtonBackground: "var(--secondaryButtonBackground)",
                secondaryText: "var(--secondaryText)",
                border: "#1E1E24",
                publicHeadingText: "var(--publicHeadingText)",
                publicSubheadingText: "var(--publicSubheadingText)",
                publicButtonText: "var(--publicButtonText)",
                publicButtonBackground: "var(--publicButtonBackground)",
                secondaryWhite: "#F2F3F7",
            },
            fontFamily: {
                header: ["Satoshi"],
                satoshi: ["Satoshi"],
                publicPrimaryFont: "var(--publicPrimaryFont)",
                publicSecondaryFont: "var(--publicSecondaryFont)",
            },
            width: {
                128: "32rem",
            },
        },
    },
    variants: {},
    plugins: [require("@tailwindcss/forms")],
};
