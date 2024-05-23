export enum MintSections {
    Theme = "theme",
    Social = "social",
    HeroSection = "hero-section",
    AboutUs = "about-us",
    Roadmap = "roadmap",
    Team = "team",
    Faqs = "faqs",
}

export class ThemeColors {
    publicHeadingText: string = "#ffffff";
    publicSubheadingText: string = "#ffffff";
    publicButtonText: string = "#ffffff";
    publicButtonBackground: string = "#ffffff";
    publicPrimaryFont: string = "Roboto";
    publicSecondaryFont: string = "Roboto";
}

export class Theme {
    light: ThemeColors = new ThemeColors();
    dark: ThemeColors = new ThemeColors();
}

export class IHero {
    image: string = "/sampleImage.png";
    title: string = "Big Lorem Ipsum";
    subtitle: string = "lorem ipsum";
    buttonText: string = "Mint now";
}
export class IAboutUsSection {
    image: string = "/sampleImage.png";
    title: string = "Story so far";
    subtitle: string = "lorem ipsum again bruh";
}

export class Roadmap {
    title: string = "Roadmap";
    subtitle: string = "Lorem ipsum again and again bruh!!";
    roadmaps: RoadmapItem[] = new Array<RoadmapItem>();
}

export class RoadmapItem {
    title: string = "";
    subtitle: string = "";
}

export class Team {
    title: string = "Team";
    subtitle: string = "Lorem ipsum again and again bruh!!";
    members: TeamMember[] = new Array<TeamMember>();
}

export class TeamMember {
    title: string = "";
    subtitle: string = "";
    image: string = "/sampleImage.png";
    social: string = "";
}

export class Faq {
    title: string = "FAQ";
    subtitle: string = "Lorem ipsum again and again bruh!!";
    faqs: FaqItem[] = new Array<FaqItem>();
}

export class FaqItem {
    title: string = "";
    subtitle: string = "";
}
