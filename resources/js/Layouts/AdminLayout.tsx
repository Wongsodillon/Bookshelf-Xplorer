import { PropsWithChildren, ReactNode, useState } from "react";
import { User } from "@/types";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "@/Components/Sidebar";
import DangerButton from "@/Components/UI/DangerButton";
import { Link } from "@inertiajs/react";

const AdminLayout = ({ user, header, children }: PropsWithChildren<{ user: User, header: string }>) => {

    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }
    return (
        <div className="flex h-screen overflow-hidden bg-black">
            <SideBar show={showSidebar} toggleShow={toggleSidebar}/>
            <div className="flex flex-col gap-4 w-full">
                <div className="overflow-y-auto overflow-x-hidden relative pb-8 px-4 lg:px-12">
                    <div className="flex justify-between py-8">
                        <div className="flex gap-4 items-center">
                            <GiHamburgerMenu size={36} className="text-white block lg:hidden cursor-pointer" onClick={() => setShowSidebar(true)}/>
                            <p className="text-3xl text-white font-bold">{header}</p>
                        </div>
                        <Link href={route('logout')} as="button" method="post">
                            <DangerButton>
                                Logout
                            </DangerButton>
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
