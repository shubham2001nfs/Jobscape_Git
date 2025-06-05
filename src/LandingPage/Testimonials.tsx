import { Avatar, Rating, Button } from "@mantine/core";
import { testimonials } from "../Data/Data";

const Testimonials = () => {
    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl text-mine-shaft-100 text-center font-bold mb-20">What<span className="text-web-orange-500"> User</span> says about us?</div>
            <div className="flex p-3">
                {
                    testimonials.map((testimonial, index) =>
                        <div key={index} className="flex flex-col gap-2 p-4 w-[23%] border rounded-lg border-web-orange-500 mx-5">
                            <div className="flex items-center gap-2">
                                <Avatar className="!h-14 !w-14" src="avatar2.png" alt="it's me" />
                                <div className="text-mine-shaft-100 text-lg font-semibold">{testimonial.name}
                                    <Rating value={testimonial.rating} fractions={2} readOnly />
                                </div>
                            </div>
                            <div className="text-mine-shaft-100 text-sm">
                                {testimonial.testimonial}
                            </div>
                        </div>)
                }
            </div>

        </div>
    );
}

export default Testimonials;