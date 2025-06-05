import { Avatar } from "@mantine/core";
import { work } from "../Data/Data";

const Working = () => {
    return (
        <div className="mt-20 flex flex-col items-center">
            <div className="text-4xl text-mine-shaft-100 font-bold mb-10">How it<span className="text-web-orange-500"> Works</span></div>
            <div className="text-mine-shaft-100 text-xl">
                Effortlessly find your dream job with our user-friendly platform!
            </div>
            <div className="flex items-center justify-between mt-10 px-16 w-full relative">
                <div className="w-[30rem]">
                    <img src="/Working/Girl.png" alt="working" />
                    <div className="w-40 flex flex-col items-center gap-1 border border-web-orange-500 rounded-lg p-2 backdrop-blur-md top-[5%] absolute">
                        <Avatar className="!h-16 !w-16" src="av2.png" alt="it's me" />
                        <div className="text-mine-shaft-100 text-sm font-semibold text-center">Complete your profile</div>
                        <div className="text-mine-shaft-100 text-xs">70% Completed</div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 mr-32">
                    {
                        work.map((work, index) => {
                            let imagePath = '';
                            switch (work.name) {
                                case 'Build Your Resume':
                                    imagePath = '/Working/Build your resume.png';
                                    break;
                                case 'Apply for Job':
                                    imagePath = '/Working/Apply for job.png';
                                    break;
                                case 'Get Hired':
                                    imagePath = '/Working/Get hired.png';
                                    break;
                            }
                            return (
                                <div key={index}>
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-full bg-web-orange-500 p-3">
                                            <img src={imagePath} alt="working" className="w-20 h-20 object-contain" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-mine-shaft-100">{work.name}</div>
                                            <div className="text-mine-shaft-200">{work.desc}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Working;