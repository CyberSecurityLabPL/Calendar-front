import useUsers from "@/hooks/useUsers";
import { columns } from "./columns"
import { DataTable } from "./dataTable"




export default function DemoPage() {
    const { users } = useUsers();

    if (!users)
        return <p>Brak użytkowników</p>;
    return (
        <div className="container w-fit mx-auto py-10">
            <DataTable columns={columns} data={users} />
        </div>
    )
}
