import { companyData } from "../Data/Company";

const AboutComp = () => {
    const company: { [key: string]: any } = companyData;

    return (
        <div className="flex flex-col gap-8 mt-4">
            {Object.keys(company).map((key, index) => {
                if (key === "Name") return null;

                if (key === "Website") {
                    return (
                        <div key={index}>
                            <div className="text-xl font-semibold mb-3">{key}</div>
                            <a
                                href={company[key]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-justify text-web-orange-500 hover:text-web-orange-700"
                            >
                                {company[key]}
                            </a>
                        </div>
                    );
                }

                if (key === "Specialties") {
                    return (
                        <div key={index}>
                            <div className="text-xl font-semibold mb-3">{key}</div>
                            <ul className="space-y-1 text-mine-shaft-300 mt-4">
                                {company[key].map((item: string, idx: number) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    );
                }

                return (
                    <div key={index}>
                        <div className="text-xl font-semibold mb-3">{key}</div>
                        <div className="text-justify text-mine-shaft-300">{company[key]}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default AboutComp;
