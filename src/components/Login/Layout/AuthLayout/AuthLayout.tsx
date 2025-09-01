import { AuthLayoutProps } from "./AuthLayout.interface";

export default function AuthLayout ({children, title}: AuthLayoutProps ){

    return(
        <section className="max-w-xl mx-auto w-full flex flex-col justify-center py-5 h-lvh">
            <h1 className="font-bold text-4xl mb-5 md:mb-10 text-center">{title}</h1>
            <div className="flex flex-col w-full border bg-gray-100 border-black/12 py-[2.5em] px-[1.5em] sm:py-[5em] sm:px-[9em] shadow-sm rounded-sm">
                {children}
            </div>
        </section>
    )
}