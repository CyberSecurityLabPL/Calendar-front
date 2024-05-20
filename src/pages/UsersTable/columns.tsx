import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Contract, Role, User } from "@/types/User"

const rolTranslation = {
    [Role.ADMIN]: "Administrator",
    [Role.USER]: "Użytkownik",
    [Role.MENAGER]: "Menager"
}

const conTranslation = {
    [Contract.ZLECENIE]: "Umowa zlecenie",
    [Contract.PRACA]: "Umowa o pracę"
}

export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {

        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    }, {
        accessorKey: "firstName",
        header: () => <div className="text-right">Imię</div>

    },
    {
        accessorKey: "lastName",
        header: () => <div className="text-right">Nazwisko</div>

    },
    {
        accessorKey: "email",
        header: () => <div className="text-right">e-mail</div>

    },
    {
        accessorKey: "role",
        header: () => <div className="text-right">Funkcja</div>,
        cell: ({ row }) => <p>{rolTranslation[row.original.role]}</p>

    },
    {
        accessorKey: "contract",
        header: () => <div className="text-right">Rodzaj umowy</div>,
        cell: ({ row }) => <p>{conTranslation[row.original.contract]}</p>
    },
    {
        accessorKey: "position",
        header: () => <div className="text-right">Stanowisko</div>

    },

    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">

                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Edytuj dane
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Usuń użytkownika</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    // ...
]