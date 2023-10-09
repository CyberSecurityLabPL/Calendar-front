"use client"

import React, { useEffect, useMemo, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import { GetSubordinatesProps } from "@/app/hooks/get-workers/types";
import { TotalHours } from "@/app/hooks/hours/types";
import { useGetSubordinates } from "../hooks/get-workers/useGetSubordinates";
import { ArrowLeft, ArrowLeft2, ArrowRight, ArrowRight2, Calendar, SearchNormal1 } from "iconsax-react";
import { useGetTotalHours } from "../hooks/hours/useGetTotalHours";
import { useRouter } from "next/navigation";
import { DropDownMenu } from "./table/DropDownMenu";
import { EditUserModal } from "./modals/EditUserModal";
import { UserInfo } from "../hooks/user-info/types";
import { useGetAllUsersInfo } from "../hooks/user-info/useGetAllUsersInfo";
import { useUserContext } from "../actions/UserContext";

interface TableProps<T> {
    dataType: "subordinates" | "totalHours" | "usersInfo";
}

export const Table = <T extends GetSubordinatesProps | TotalHours | UserInfo>({ dataType }: TableProps<T>) => {

    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");
    const [userToEdit, setUserToEdit] = useState<T | null>(null);
    const columnHelper = createColumnHelper<T>();
    const { user } = useUserContext();
    const router = useRouter();
    const { subordinates } = useGetSubordinates();
    const { totalHours } = useGetTotalHours();
    const { usersInfo } = useGetAllUsersInfo();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                let fetchedData: T[] = [];
                if (dataType === "subordinates") {
                    fetchedData = subordinates as T[];
                } else if (dataType === "totalHours") {
                    fetchedData = totalHours as T[];
                } else if (dataType === "usersInfo") {
                    fetchedData = usersInfo as T[];
                }
                setData(fetchedData);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dataType, subordinates, totalHours, usersInfo]);


    const generateColumns = (): any[] => {
        if (data.length === 0) {
            return [];
        } else if (data.length > 0 && "email" in data[0]) {
            return [
                columnHelper.accessor((row) => row.firstName, {
                    header: "Imię",
                }),
                columnHelper.accessor((row) => row.lastName, {
                    header: "Nazwisko",
                }),
                columnHelper.accessor("email" as any, {
                    header: "Email",
                }),
                columnHelper.accessor("companyDto.name" as any, {
                    header: "Firma",
                }),
                columnHelper.accessor("position" as any, {
                    header: "Stanowisko",
                }),
                columnHelper.accessor("id" as any, {
                    header: "",
                    cell: (row) => {
                        const userId = "userId" in row.row.original ? row.row.original.userId : row.row.original.id;
                        return (
                            <>
                                {user && (user.role === "ROLE_ADMIN") && (
                                    <DropDownMenu user={row.row.original}
                                        setUserToEdit={setUserToEdit}
                                        userId={userId} />
                                )}
                            </>
                        );
                    }
                }),
            ];
        } else if (data.length > 0 && "userId" in data[0]) {
            return [
                columnHelper.accessor((row) => row.firstName, {
                    header: "Imię",
                }),
                columnHelper.accessor((row) => row.lastName, {
                    header: "Nazwisko",
                }),
                columnHelper.accessor("month" as any, {
                    header: "Miesiąc",
                }),
                columnHelper.accessor("hoursSubmitted" as any, {
                    header: "Status",
                }),
                columnHelper.accessor("totalHours" as any, {
                    header: "Suma godzin",
                }),
                columnHelper.accessor("userId" as any, {
                    header: "",
                    cell: (row) => {
                        const userId = "userId" in row.row.original ? row.row.original.userId : row.row.original.id;
                        return (
                            <>
                                {user && (user.role === "ROLE_MANAGER") && (
                                    <button onClick={() => {
                                        router.push(`/dashboard/calendar/${userId}`);
                                    }}>
                                        <Calendar color="#737373" />
                                    </button>
                                )}
                            </>
                        );
                    }   
                })
            ];
        }

        return [];
    };

    const columns = useMemo(() => generateColumns(), [data]);

    const table = useReactTable<T>({
        data: data,
        columns,
        state: {
            globalFilter
        },
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <>
            {isLoading && <div className="flex justify-center items-center w-full h-[550px] rounded-lg bg-white"> Loading... </div>}
            <div className="border-[.5px] w-full h-[550px] p-4 rounded-lg flex flex-col items-end gap-4">
                <div className="self-start flex items-center gap-4">
                    <SearchNormal1 size={24} color="#737373" />
                    <input className="self-start p-2 outline-none"
                        type="text"
                        placeholder="Search..."
                        value={globalFilter ?? ""}
                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                    />
                </div>
                <table className="w-full">
                    <thead className="border-b-[.5px] p-4">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th className="text-center p-2 text-lg text-[#737373]" key={header.id} scope="col">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="p-8 rounded-full">
                        {table.getRowModel().rows.map((row) => (
                            <tr className="border-b-[.5px] " key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td className="text-center font-normal p-2" key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ul className="pagination flex gap-2">
                <li className="page-item">
                    <button
                        className="p-1"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}>
                        <ArrowLeft size={24} color="#737373" />
                    </button>
                </li>
                <li className="page-item">
                    <button
                        className="p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                        <ArrowLeft2 size={24} color="#737373" />
                    </button>
                </li>
                <li className="page-item">
                    <button
                        className="p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                        <ArrowRight2 size={24} color="#737373" />
                    </button>
                </li>
                <li className="page-item">
                    <button
                        className="p-1"
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}>
                        <ArrowRight size={24} color="#737373" />
                    </button>
                </li>
                <li className="page-item">
                    <select
                        className="form-select"
                        style={{ width: "150px", marginLeft: "10px" }}
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}>
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </li>
            </ul>
            <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
            </div>
            {userToEdit && <EditUserModal userToEdit={userToEdit} />}
        </>
    );
}