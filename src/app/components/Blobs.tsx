import Image from 'next/image'
import style from "@/app/styles/Blobs.module.css";

export const Blobs = () => {
    return (
        <div className={`absolute  bottom-0 left-0 -z-10 w-full h-full ${style.login_blob_container}`}>
            <div className={style.login_blob_1}>
                <Image src="/blobs/login-blob-1.svg" width={1000} height={1000} alt="" />
            </div>
            <div className={style.login_blob_2}>
                <Image src="/blobs/login-blob-2.svg" width={1000} height={1000} alt="" />
            </div>
            <div className={style.login_blob_3}>
                <Image src="/blobs/login-blob-3.svg" width={1000} height={1000} alt="" />
            </div>
            <div className={style.login_blob_4}>
                <Image src="/blobs/login-blob-4.svg" width={1000} height={1000} alt="" />
            </div>
        </div>
    )
}