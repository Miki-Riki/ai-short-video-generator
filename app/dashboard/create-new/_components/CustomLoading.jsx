import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'


function CustomLoading({loading}) {
    return (
        <AlertDialog open={loading}>

            <AlertDialogContent>
                <div className='flex flex-col items-center my-10 justify-center'>
                    <Image src={'/loading.gif'} alt='loading' width={100} height={100}></Image>
                    <h2>Generating video please wait...</h2>
                </div>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default CustomLoading
