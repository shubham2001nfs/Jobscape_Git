import { Button, TextInput } from "@mantine/core";

const Subscribe = () => {
    return (
        <div className="mt-20 items-center justify-center flex bg-mine-shaft-900 rounded-lg py-3 w-[70%] mx-auto">
            <div className="text-4xl text-mine-shaft-100 font-bold mb-5 text-center w-[50%] ">Never Want to Miss Any<span className="text-web-orange-500"> Job News?</span></div>
            <div className="flex mx-3 bg-mine-shaft-700 px-3 py-2 items-center ">
                <TextInput
                    className="[&_input]:text-mine-shaft-100 font-semibold"
                    variant="unstyled"
                    placeholder="Your@gmail.com"
                    size="md"
                />
                <Button className="!bg-web-orange-500 hover:!bg-web-orange-600">Subscribe</Button>
            </div>
        </div>
    )
}

export default Subscribe;