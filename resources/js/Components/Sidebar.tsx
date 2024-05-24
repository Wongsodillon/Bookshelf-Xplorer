import { LuLayoutDashboard } from "react-icons/lu";
import NavLink from "./UI/NavLink";
import SidebarLink from "./UI/SidebarLink";
import { FaRegUser } from "react-icons/fa";
import SidebarButton from "./UI/SidebarButton";
import { useState } from "react";
import { IoMdClose, IoMdArrowBack } from "react-icons/io";

type SidebarProps = {
    show? : boolean;
    toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ show = true, toggleShow }: SidebarProps) => {

    return (
        <aside className={"absolute left-0 top-0 z-50 flex h-screen w-72 lg:min-w-[20%] flex-col overflow-y-hidden bg-gray-800 duration-300 ease-linear lg:static lg:translate-x-0 " + (show ? 'translate-x-0' : '-translate-x-full')}>
            <div className="px-6 py-6 flex justify-between items-center">
                <p className="text-white text-xl font-bold">Bookshelf Xplorer Admin</p>
                <button onClick={() => toggleShow(false)} className="lg:hidden">
                    <IoMdClose size={24} className="text-white"/>
                </button>
            </div>
            <div className="no-scrollbar overflow-y-auto flex flex-col duration-300 ease-linear">
                <nav className="py-4 px-4 lg:px-6">
                    <div>
                        <p className="text-lg text-gray-300 font-bold mb-4">Menu</p>
                        <ul className="mb-6 flex flex-col gap-2">
                            <li>
                                <SidebarButton href={route('admin.dashboard')} active={route().current('admin.dashboard') || route().current('admin.add-book') || route().current('admin.edit')}>
                                    <LuLayoutDashboard size={24} className="text-white"/>
                                    <p className="text-white font-bold text-xl">Books</p>
                                </SidebarButton>
                                <ul className="mt-2 mb-5 flex flex-col gap-3 pl-6">
                                    <SidebarLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                                        View all books
                                    </SidebarLink>
                                    <SidebarLink href={route('admin.add-book')} active={route().current('admin.add-book')}>
                                        Add new book
                                    </SidebarLink>
                                </ul>
                            </li>
                            <li>
                                <SidebarButton href={route('admin.users')} active={route().current('admin.users') || route().current('admin.user')}>
                                    <FaRegUser size={18} className="text-white"/>
                                    <p className="text-white font-bold text-xl">Users</p>
                                </SidebarButton>
                            </li>
                            <li>
                                <SidebarButton href={route('dashboard')} active={false}>
                                    <IoMdArrowBack size={22} className="text-white"/>
                                    <p className="text-white font-bold text-xl">Back</p>
                                </SidebarButton>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
}

export default SideBar;
