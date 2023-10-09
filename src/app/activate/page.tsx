"use client"

import { Blobs } from "@/app/components/Blobs";
import { ActivateModal } from "@/app/components/modals/ActivateModal";

export default function ActivatePage() {

    return (
        <>
            <div>
                <ActivateModal />
            </div>
            <Blobs />
        </>
    )
}