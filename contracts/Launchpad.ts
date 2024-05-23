import {
    Faq,
    IAboutUsSection,
    IHero,
    MintSections,
    Roadmap,
    Team,
    Theme,
} from "./Mint";

export class PublicPagePreferences {
    subdomain: string;
    theme: Theme = new Theme();
    heroSection: IHero = new IHero();
    aboutUsSection: IAboutUsSection = new IAboutUsSection();
    roadmap: Roadmap = new Roadmap();
    team: Team = new Team();
    faq: Faq = new Faq();
    sections: Record<Partial<MintSections>, boolean> = {
        [MintSections.AboutUs]: true,
        [MintSections.Faqs]: true,
        [MintSections.Roadmap]: true,
        [MintSections.Team]: true,
        [MintSections.HeroSection]: true,
        [MintSections.Theme]: true,
        [MintSections.Social]: true,
    };
}

export class LaunchCollection {
    id: string = "";
    deleted: boolean = false;
    published: boolean = false;
    userId: string = "";
    projectName: string = "";
    primaryContact: string = "";
    twitter: string = "";
    discord: string | null = null;
    website: string | null = null;
    cm_id: string | null = null;
    assetChoice: "ready" | "generation_required" | "not_started" =
        "not_started";
    assetHash: string | null = null;
    collectionDetailsId: string | null = null;
    publicPage: PublicPagePreferences = new PublicPagePreferences();
    airtableId: string;
    externalLandingPage: string | null = null;
    landingPagePreference: "incupad_template" | "own_landing_page" =
        "incupad_template";
}
