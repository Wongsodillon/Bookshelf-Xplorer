import { useEffect } from "react";
import Dropdown from "./UI/Dropdown";

type FilterDropdownProps = {
    options: string[];
    value: string;
    setvalue: React.Dispatch<React.SetStateAction<string>>;
    includeAll?: boolean;
    above?: boolean;
    fullWidth?: boolean;
    withBorder?: boolean;
};

const FilterDropdown = ({ options, value, setvalue, includeAll = true, above = false, fullWidth = false, withBorder = true }: FilterDropdownProps) => {

    if (includeAll) {
        options = ['All', ...options]
    }

    const onSelectDropdown = (selectedValue: string) => {
        setvalue(selectedValue);
    };

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className={"inline-flex rounded-md " + (fullWidth ? 'w-full' : '')}>
                    <button className={"flex items-center px-4 py-4 text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150" + (fullWidth ? ' w-full' : '') + (withBorder ? ' sm:border-gray-200 sm:border' : ' px-6 py-6 text-md rounded-sm')}>
                        {value}
                        <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                    </button>
                </span>
            </Dropdown.Trigger>
            <Dropdown.Content align="left" above={above}>
                {options.map((option, i) => (
                    <Dropdown.Button key={i}
                        onSelectDropdown={onSelectDropdown}
                        value={option}
                    >
                        {option}
                    </Dropdown.Button>
                ))}
            </Dropdown.Content>
        </Dropdown>
    );
}

export default FilterDropdown;
