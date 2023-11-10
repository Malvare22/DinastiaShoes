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
        <div className="bg-blue text-black">
            <table>
                <thead>
                    {
                        table.getHeaderGroups().map(
                            headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(
                                        header => (
                                            <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        )
                                    )}
                                </tr>
                            )
                        )
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
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
