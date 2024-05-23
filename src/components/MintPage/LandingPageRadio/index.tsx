const notificationMethods = [
    { id: "incupad_template", title: "Build Landing page" },
    { id: "own_landing_page", title: "Use your own landing page" },
];

const LandingPageOptions = ({ checked, onChange }) => {
    console.log({ checked });
    return (
        <div>
            <label className="text-base font-medium">
                Landing Page Preference
            </label>
            <p className="text-sm leading-5 text-gray-500">
                Build or use your own existing landing page
            </p>
            <fieldset className="mt-4" onChange={(e) => console.log(e.target)}>
                <legend className="sr-only">Notification method</legend>
                <div className="space-y-4">
                    {notificationMethods.map((notificationMethod) => (
                        <div
                            key={notificationMethod.id}
                            className="flex items-center cursor-pointer"
                        >
                            <input
                                id={notificationMethod.id}
                                name="notification-method"
                                type="radio"
                                onChange={(e) => onChange(e.target.id)}
                                checked={notificationMethod.id === checked}
                                className="outline-none focus:outline-none h-4 w-4 text-secondaryText border-border"
                            />
                            <label
                                htmlFor={notificationMethod.id}
                                className="ml-3 block text-sm font-medium text-primaryText"
                            >
                                {notificationMethod.title}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    );
};

export default LandingPageOptions;
