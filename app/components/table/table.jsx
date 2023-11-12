import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel } from "@tanstack/react-table"
import { useEffect, useState } from "react";
import { columnasEmpleados } from "./columns";
import TableAction from "./table_actions";

export const Table = (props) => {

    const {columns, actions, data} = props;

    const [sorting, setSorting] = useState([]);

    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), 
        getSortedRowModel: getSortedRowModel(), 
        state: {
            sorting
        },
        onSortingChange: setSorting
    });

    return (
        <div className="text-black flex justify-center">
            <table className="border-separate md:border-spacing-4 text-center">
                <thead className="">
                    {
                        table.getHeaderGroups().map(
                            headerGroup => (
                                <tr key={headerGroup.id} className="">
                                    {headerGroup.headers.map(
                                        header => (
                                            <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="bg-grisAzulado md:p-5 rounded-lg md:w-40">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        )
                                    )}
                                    <th className="bg-grisAzulado md:p-5 rounded-lg md:w-40">Acciones</th>
                                </tr>
                            )
                        )
                    }
                </thead>
                <tbody className="">
                    {
                        table.getRowModel().rows.map((row, index) => (
                            <tr key={row.id} className="">
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="bg-lightGrey md:p-5 rounded-lg">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                                <td className="bg-lightGrey md:p-5 rounded-lg space-x-5"> 
                                    { 
                                        actions.map((act)=>{
                                            return <TableAction action={() => act.action(data[index])} icon={act.icon}></TableAction>
                                        })
                                    }
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
