import { useState, createContext, useContext, Fragment, PropsWithChildren, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Link, InertiaLinkProps } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const DropDownContext = createContext<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    toggleOpen: () => void;
}>({
    open: false,
    setOpen: () => {},
    toggleOpen: () => {},
});

const Dropdown = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }: PropsWithChildren) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        toggleOpen();
    };

    return (
        <>
            <div onClick={handleClick}>{children}</div>
            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};


const Content = ({ align = 'right', width = '48', contentClasses = 'py-1 bg-white', above = false, children }: PropsWithChildren<{ align?: 'left'|'right', width?: '48', contentClasses?: string, above?: boolean }>) => {
    const { open, setOpen } = useContext(DropDownContext);
    const contentRef = useRef<HTMLDivElement>(null);

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    if (above) {
        alignmentClasses = `${alignmentClasses} -mt-[16rem]`;
    }
    else {
        alignmentClasses = `${alignmentClasses} mt-2`;
    }

    let widthClasses = '';

    if (width === '48') {
        widthClasses = 'w-48';
    }

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                    onClick={() => setOpen(false)}
                    ref={contentRef}
                >
                    <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>{children}</div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = '', children, ...props }: InertiaLinkProps) => {
    return (
        <Link
            {...props}
            className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ' +
                className
            }
        >
            {children}
        </Link>
    );
};

type DropdownButtonProps = PropsWithChildren & {
    onSelectDropdown: (value: string) => void;
    value: string;
}

const DropdownButton = ({ children, onSelectDropdown, value }: DropdownButtonProps) => {

    const { open, setOpen } = useContext(DropDownContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSelectDropdown(value);
        setOpen(false);
    };

    return (
        <button
            className={'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};


Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
Dropdown.Button = DropdownButton;

export default Dropdown;
