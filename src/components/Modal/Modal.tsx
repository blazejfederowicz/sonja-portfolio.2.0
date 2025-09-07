'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CANCEL, SAVE } from '@/constants'
import { ModalProps } from './Modal.interface'
import useAuth from '@/hooks/useAuth/useAuth'
import { useState } from 'react'

export default function Modal({children, headline, form, buttonColor, buttonText}:ModalProps) {
    const [open, setOpen] = useState(false)
    const { session } = useAuth()

    if(!session) return

    return (
        <div>
        <button
            onClick={() => setOpen(true)}
            className={`rounded-md ${buttonColor} h-full px-2.5 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:opacity-90 active:opacity-90 cursor-pointer duration-100`}
        >
            {buttonText}
        </button>
        <Dialog open={open} onClose={setOpen} className="relative z-100">
            <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                transition
                className="relative w-full flex flex-col max-h-[calc(100vh-2rem)] transform overflow-hidden rounded-lg bg-neutral-200 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                    
                <div className="bg-neutral-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4  overflow-y-auto flex-1 min-h-0">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-salmon sm:mx-0 sm:size-10">
                            <i className="bi bi-brilliance text-white"/>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-4 w-full flex flex-col min-h-0">
                            <DialogTitle as="h3" className="text-lg font-bold tracking-wider text-neutral-700 text-center sm:text-left">
                            {headline}
                            </DialogTitle>
                            <div className="mt-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                    type="submit"
                    form={form}
                    className="inline-flex w-full justify-center rounded-md bg-salmon px-3 py-2 text-sm font-semibold text-white hover:bg-salmon2 active:bg-salmon2 sm:ml-3 sm:w-auto cursor-pointer"
                    >
                    {SAVE}
                    </button>
                    <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-black/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-black/20 active:bg-black/20 sm:mt-0 sm:w-auto cursor-pointer"
                    >
                    {CANCEL}
                    </button>
                </div>
                </DialogPanel>
            </div>
            </div>
        </Dialog>
        </div>
    )
}
