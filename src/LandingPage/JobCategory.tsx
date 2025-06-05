import { Carousel, CarouselSlide } from "@mantine/carousel";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { jobCategory } from "../Data/Data";
const JobCategory = () => {
    return (
        <div className="mt-20 flex flex-col items-center px-20">
            <div className="text-4xl text-mine-shaft-100 font-bold mb-10">Browse<span className="text-web-orange-500"> Job</span> Category</div>
            <div className="text-mine-shaft-100 text-xl">
                Explore diverse job categories and find your dream job!
            </div>
            <Carousel
                slideSize="25%"
                slideGap="md"
                loop
                align="start"
                className="w-full mt-10 mb-5 [&_button]:hover:opacity-80 [&_button]:opacity-0 [&_button]:bg-web-orange-500 [&_button]:border-none"
                nextControlIcon={<IconArrowRight size={16} className="text-black" />}
                previousControlIcon={<IconArrowLeft size={16} className="text-black" />}
            >
                {
                    jobCategory.map((job, index) => (
                        <Carousel.Slide key={index}>
                            <div className="mt-10 flex flex-col items-center w-full border border-mine-shaft-900 rounded-lg p-5 gap-2 hover:border-web-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-web-orange-500/20">
                                <div className="bg-web-orange-500 rounded-full p-2">
                                    <img src={`/Category/${job.name}.png`} className="w-10 h-10" />
                                </div>
                                <div className="text-mine-shaft-200 text-xl font-bold">
                                    {job.name}
                                </div>
                                <div className="text-mine-shaft-200 text-sm text-center">
                                    {job.desc}
                                </div>
                                <div className="text-web-orange-500 text-lg">
                                    {job.jobs}+  new job posted
                                </div>
                            </div>
                        </Carousel.Slide>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default JobCategory;