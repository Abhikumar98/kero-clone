export interface IAppTheme {
    primaryText: string;
    secondaryText: string;
    primaryBackground: string;
    secondaryBackground: string;
    headerBackground: string;
    secondaryButtonBackground: string;
    publicHeadingText: string;
    publicSubheadingText: string;
    publicButtonText: string;
    publicButtonBackground: string;
    publicPrimaryFont: string;
    publicSecondaryFont: string;
}

export const darkModeTheme: Partial<IAppTheme> = {
    primaryText: "#fff",
    secondaryText: "#7E7E8F",
    primaryBackground: "#000",
    secondaryBackground: "#FFFFFF0D",
    headerBackground: "#07070a",
    secondaryButtonBackground: "#1E1E24",
};

export const lightModeTheme: Partial<IAppTheme> = {
    primaryText: "#000",
    secondaryText: "#555555",
    primaryBackground: "#fff",
    secondaryBackground: "#0000000D",
    headerBackground: "#0000000D",
    secondaryButtonBackground: "#e2e2ea",
};
