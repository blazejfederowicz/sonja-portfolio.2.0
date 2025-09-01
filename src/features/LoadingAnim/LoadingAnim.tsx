import "./loadingAnim.css"
import { LoadingAnimProps } from "./LoadingAnim.interface"

export default function LoadingAnim({customClass}:LoadingAnimProps) {
    return (
        <div className={customClass}>
            <span className="animate-bounce">.</span>
            <span className="animate-bounce anim-delay-200">.</span>
            <span className="animate-bounce anim-delay-300">.</span>
        </div>
    )
}