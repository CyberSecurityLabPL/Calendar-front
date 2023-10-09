import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";
import { EventApi, EventClickArg, EventContentArg } from "@fullcalendar/core"
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const handleEventClick = async (clickInfo: EventClickArg) => {
    const event: EventApi = clickInfo.event;
    const id = event.url;
    clickInfo.jsEvent.preventDefault();

    Swal.fire({
        title: `Czy na pewno chcesz usunąć wpis ${event.title}, ${event.startStr}?`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Anuluj",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tak, usuń!'
    }).then(async (result: any) => {
        if (result.isConfirmed) {
            try {
                await fetchAPI(API_URLS.DELETE_USER_TASK + id, {
                    method: "DELETE",
                });

                event.remove();
                toast.success("Wpis usunięty pomyślnie");

            } catch (error) {
                toast.error("Wystąpił błąd podczas usuwania wpisu");
                console.error("Error deleting hours:", error);
            }
        }
    });
};



export const handleEvents = (events: EventApi[]) => {
    ({
        currentEvents: events
    })
}

export const renderEventContent = (eventContent: EventContentArg) => {
    return (
        <div className="flex flex-col items-start p-2 text-base min-w-[20px] max-w-[200px] truncate text-[#5498DC]">
            <b className="truncate w-36">{eventContent.event.title}</b>
            <p>{eventContent.event.startStr.split('T')[1]}</p>
            <p>{eventContent.event.endStr.split('T')[1]}</p>
        </div>
    )
}