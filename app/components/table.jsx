import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel } from "@tanstack/react-table"
import { getEmpleados } from "../lib/empleados"
import data from '../jsons/empleados.json'
import { useEffect, useState } from "react";

export const Table = () => {

    const [sorting, setSorting] = useState([]);

    const columns = [
        {
            header: "Id",
            accessorKey: "id"
        },
        {
            header: "Nombre",
            accessorKey: "nombre"
        },
        {
            header: "Correo",
            accessorKey: "correo"
        },
        {
            header: "Telefono",
            accessorKey: "telefono"
        },
    ];
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
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="">
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="bg-lightGrey md:p-5 rounded-lg">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
