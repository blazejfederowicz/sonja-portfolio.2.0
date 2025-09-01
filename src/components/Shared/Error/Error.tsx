import { ERROR } from "@/constants";
import { ErrorProps } from "./Error.interface";

export default function Error({errorMessage}: ErrorProps){

    return(
        <section className="flex flex-col w-full flex-grow items-center justify-center break-words">
            <h1 className="text-3xl sm:text-4xl md:text-6xl">{ERROR}</h1>
            {Array.isArray(errorMessage) ?
                errorMessage.map((err, i) => (
                    <p key={i} className="text-red-600 mt-2 text-center">
                        {err}
                    </p>
                )): errorMessage?
                    <p className="text-red-600 mt-2 text-center">
                        {errorMessage}
                    </p>:""
            }
        </section>
    )
}