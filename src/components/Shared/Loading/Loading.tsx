import LoadingAnim from '@/features/LoadingAnim/LoadingAnim'
import { LOADING_TEXT } from '../../../constants'


export default function Loading(){

    return(
        <section className="flex flex-col w-full flex-grow items-center justify-center animate-pulse">
            <h1 className="text-3xl sm:text-4xl md:text-6xl flex">{LOADING_TEXT}
                <LoadingAnim customClass="ms-3 md:ms-5 flex"/>
            </h1>
        </section>
    )
}