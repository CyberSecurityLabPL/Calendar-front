"use client"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import { handleEventClick, handleEvents, renderEventContent } from "@/app/actions/calendar/EventHandlers";
import { Hours } from "@/app/hooks/hours/types";
import { Calendar, Printer } from "iconsax-react";
import "@/app/styles/calendar/calendar.css";
import { useModals } from "@/app/hooks/useModals";
import { HoursStatusModal } from "../../modals/HoursStatusModal";
import { AddHourModal } from "../../modals/AddHourModal";
import { useAddHourModal } from "@/app/hooks/useAddHourModal";
import { DateSelectArg } from "@fullcalendar/core";
import { useHours } from "@/app/hooks/hours/useHours";
import toast from "react-hot-toast";
import { useUserContext } from "@/app/actions/UserContext"
import { usePrintTasks } from "@/app/hooks/hours-pdfs/usePrintTasks"
import { usePrintHours } from "@/app/hooks/hours-pdfs/usePrintHours"
import Swal from "sweetalert2";
import {useEffect } from "react"
import { useRouter } from "next/navigation"


export interface CalendarProps {
    userHours: Hours[];
    userId: string;
}

export const CalendarComponent = ({
    userHours,
    userId,
}: CalendarProps) => {
    const hoursStatusModal = useModals();
    const router = useRouter();
    const { addHours } = useHours(userId);
    const addHourModal = useAddHourModal();
    const { hoursBlob } = usePrintHours(userId);
    const { tasksBlob } = usePrintTasks(userId);
    const { user } = useUserContext();
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [ ]);

    const printHoursOnClick = async () => {
        try {
            const printPdf = hoursBlob as Blob;

            if (hoursBlob) {
                const pdfUrl = URL.createObjectURL(printPdf);
                const printWindow = window.open(pdfUrl, '_blank');

                if (printWindow) {
                    printWindow.print();
                } else {
                    console.error('Error opening print window.');
                }
            }
        } catch (error) {
            console.error('Error printing tasks:', error);
        }
    }

    const printTasksOnClick = async () => {
        try {
            const printPdf = tasksBlob as Blob;

            if (tasksBlob) {
                const pdfUrl = URL.createObjectURL(printPdf);
                const printWindow = window.open(pdfUrl, '_blank');

                if (printWindow) {
                    printWindow.print();
                } else {
                    console.error('Error opening print window.');
                }
            }
        } catch (error) {
            console.error('Error printing tasks:', error);
        }
    }

    const handleDateSelect = async (selectInfo: DateSelectArg) => {
        const calendarApi = selectInfo.view.calendar;

        const newHours = {
            UserId: 0,
            hoursId: 0,
            startTime: selectInfo.start,
            endTime: selectInfo.end,
            tasks: "",
        };
        Swal.fire({
            title: "Podaj nazwę wpisu",
            text: "",
            icon: "info",
            showCancelButton: true,
            cancelButtonText: "Anuluj",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Dodaj wpis',
            input: "text",
            inputValue: newHours.tasks,
        }).then(async (tasks) => {
            if (tasks.isConfirmed) {
                newHours.tasks = tasks.value;

                calendarApi.addEvent({
                    title: newHours.tasks,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                });

                try {
                    await addHours.mutateAsync(newHours as any);
                    toast.success("Wpis został dodany pomyślnie");
                } catch (error) {
                    console.error("Error adding hours:", error);
                    toast.error("Nie udało się dodać wpisu");
                }
            }
        });
    };

    return (
        <div className="flex flex-col w-full  gap-8 z-0">
            <div className="flex items-center justify-between gap-4 pb-4 h-full border-b-[.5px]">
                <div className="flex gap-4">
                    <Calendar />
                    <h1 className="text-xl font-bold text-center">
                        Kalendarz
                    </h1>
                </div>
                <div className="flex gap-4">
                    <button
                        className="flex gap-2 cursor-pointer"
                        onClick={printHoursOnClick}>
                        <p>Drukuj godzinówkę</p>
                        <Printer size={24} />
                    </button>
                    <button
                        className="flex gap-2 cursor-pointer"
                        onClick={printTasksOnClick}>
                        <p>Drukuj zadania</p>
                        <Printer size={24} />
                    </button>
                </div>
            </div>
            <div className="border-[.5px] gap-4 p-4 rounded-lg bg-white flex flex-col">
                <FullCalendar
                    height={490}
                    plugins={[
                        resourceTimelinePlugin,
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin,
                    ]}
                    headerToolbar={{
                        right: 'myCustomButton prev,next',
                        center: 'title',
                        left: 'timeGridDay,timeGridWeek,dayGridMonth',
                    }}
                    customButtons={{
                        myCustomButton: {
                            text: 'Dodaj wpis',
                            click: () => {
                                addHourModal.onOpen();
                            }
                        }
                    }}
                    initialView="timeGridWeek"
                    navLinks={true}
                    timeZone="Europe/Warsaw"
                    allDaySlot={false}
                    forceEventDuration={true}
                    defaultAllDayEventDuration={{ hour: 8 }}
                    businessHours={{
                        daysOfWeek: [1, 2, 3, 4, 5],
                        startTime: '08:00',
                        endTime: '16:00',
                    }}
                    nowIndicator={false}
                    editable={true}
                    selectable={false}
                    selectMirror={true}
                    dayMaxEventRows={3}
                    schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                    dayMaxEvents={1}
                    select={handleDateSelect}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                    events={Array.isArray(userHours) ? userHours.map(hour => ({
                        title: hour.tasks,
                        start: hour.startTime,
                        end: hour.endTime,
                        url: hour.hoursId.toString(),
                    })) : []}
                    eventsSet={handleEvents}
                    eventMaxStack={1}
                    locale={"pl"}
                    buttonText={{
                        today: "Dzisiaj",
                        month: "Miesiąc",
                        week: "Tydzień",
                        day: "Dzień",
                    }}
                    slotDuration={"01:00:00"}
                    eventBackgroundColor="rgba(84, 152, 220, .15)"
                    eventDisplay={"list-item"}
                    slotEventOverlap={false}
                    eventBorderColor="transparent"
                />
                {user && (user.role === "ROLE_USER") && (
                    <>
                        <div className="self-end">
                            <button className="w-48 bg-[#5498DC] text-white rounded-[4px] py-2 my-2 mx-auto justify-self-end"
                                onClick={hoursStatusModal.onOpen}>
                                Oznacz jako oddana
                            </button>
                        </div>
                        <HoursStatusModal />
                        <AddHourModal />
                    </>
                )}
            </div>
        </div>
    )
}