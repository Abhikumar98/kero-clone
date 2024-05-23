export const getSubdomain = (req: any) => {
    const [host] =
        req.headers.host?.split(process.env.NEXT_PUBLIC_HOST_NAME) ?? "";
    return host.replace(".", "");
};

export const isValidSubdomain = (subdomain: string) => {
    const invalidCustomDomains = ["app", "www", "generator", "keroverse"];

    if (!subdomain) {
        return false;
    }

    return (
        !invalidCustomDomains.includes(subdomain) &&
        process.env.NODE_ENV !== "development"
    );
};
