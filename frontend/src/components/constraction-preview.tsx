import { FaRegTrashAlt } from "react-icons/fa";
import { timeService } from "../services/time.service";
import { TimerDuration } from "../types/timer-duration"

type ConstractionPreviewProps = {
    number: number;
    constraction: TimerDuration
    prevConstraction: undefined | TimerDuration
    onRemoveConstraction: (id?: string) => void
}


export const ConstractionPreview: React.FC<ConstractionPreviewProps> = ({ number, constraction, prevConstraction, onRemoveConstraction }) => {
    const constractionTime = timeService.getMSDifference(constraction.start, constraction.end)

    let prevConstractionDiffrenceTime = undefined
    if (prevConstraction?.end) {
        prevConstractionDiffrenceTime = timeService.getMSDifference(constraction.start, prevConstraction?.end)
    }

    return (
        <div className="constraction-preview-container">
            <span className="count">{number + 1}</span>
            <span className="time">{timeService.getHHMMDisplayTime(constraction.start)}</span>
            <span className="time">{timeService.getHHMMDisplayTime(constraction.end)}</span>
            <span className="duration">{timeService.getMMSSDifferenceDisplay(constractionTime)}</span>
            {prevConstractionDiffrenceTime
                ? <span>{timeService.getMMSSDifferenceDisplay(prevConstractionDiffrenceTime)}</span>
                : <span></span>}
            <button className="remove" onClick={() => onRemoveConstraction(constraction._id)}><FaRegTrashAlt /></button>
        </div>
    )
}