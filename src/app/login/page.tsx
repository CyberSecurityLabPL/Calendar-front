"use client"

import { LoginModal } from "../components/modals/LoginModal";
import { Blobs } from "../components/Blobs";


export default function LoginPage() {
    return (
        <>
            <div>
                
                <LoginModal />
            </div>
            <Blobs />
        </>
    )
}