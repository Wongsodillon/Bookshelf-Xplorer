import { PropsWithChildren } from "react";

const Table = ({ children }: PropsWithChildren) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg select-none">
            <table className="w-full text-sm text-left text-gray-500">
                {children}
            </table>
        </div>
    )
}

const TableHeader = ({ children }: PropsWithChildren) => {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {children}
        </thead>
    )
}

const TableRow = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => {
    return (
        <tr className={"bg-white border-b " + className}>
            {children}
        </tr>
    )
}

const TableHead = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => {
    return (
        <th scope="col" className={"px-6 py-3 " + className}>
            {children}
        </th>
    )
}

const TableBody = ({ children }: PropsWithChildren) => {
    return (
        <tbody>
            {children}
        </tbody>
    )
}

const TableCell = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => {
    return (
        <td className={"px-6 py-4 " + className}>
            {children}
        </td>
    )
}

export { Table, TableHeader, TableRow, TableHead, TableBody, TableCell };
