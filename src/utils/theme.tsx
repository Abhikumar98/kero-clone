import { IAppTheme } from "../contracts/theme";

export const Theme = ({ theme }: { theme: Partial<IAppTheme> }) => {
    const customTheme = `
	:root{
		--primaryText: ${theme["primaryText"]};
		--secondaryText: ${theme["secondaryText"]};
		--primaryBackground: ${theme["primaryBackground"]};
		--secondaryBackground: ${theme["secondaryBackground"]};
		--headerBackground: ${theme["headerBackground"]};
		--secondaryButtonBackground: ${theme["secondaryButtonBackground"]};

		${
            theme["publicHeadingText"] &&
            `--publicHeadingText: ${theme["publicHeadingText"]}`
        }
		${
            theme["publicSubheadingText"] &&
            `--publicSubheadingText: ${theme["publicSubheadingText"]}`
        }
		${
            theme["publicButtonText"] &&
            `--publicButtonText: ${theme["publicButtonText"]}`
        }
		${
            theme["publicButtonBackground"] &&
            `--publicButtonBackground: ${theme["publicButtonBackground"]}`
        }
		${
            theme["publicPrimaryFont"] &&
            `--publicPrimaryFont: ${theme["publicPrimaryFont"]}`
        }
		${
            theme["publicSecondaryFont"] &&
            `--publicSecondaryFont: ${theme["publicSecondaryFont"]}`
        }

	}
	`;

    return <style>{customTheme}</style>;
};
