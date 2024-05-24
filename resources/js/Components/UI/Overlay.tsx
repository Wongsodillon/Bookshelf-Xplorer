import { PageProps } from "@/types";
import { PropsWithChildren } from "react";

const Overlay = ({ children }: PropsWithChildren) => {
    return (
        <div className="overlay absolute rounded-md left-0 top-0 w-full h-full flex flex-col justify-center items-center px-2 md:px-4 lg:px-6 translate-y-full transition-all duration-700">
            {children}
        </div>
    );
}

export default Overlay;
