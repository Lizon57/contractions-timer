import { FaHistory } from "react-icons/fa"
import { TimerDuration } from "../types/timer-duration"
import { ConstractionPreview } from "./constraction-preview"
import { ConstractionsListHead } from "./constractions-list-head"

type ConstractionsListProps = {
    constractions: Array<TimerDuration>
    onRemoveConstraction: (startTime: number) => void
    onClearConstractions: () => void
}


export const ConstractionsList: React.FC<ConstractionsListProps> = ({ constractions, onRemoveConstraction, onClearConstractions }) => {
    return (
        <div className="constractions-list-container">
            <ConstractionsListHead />
            <div className="list-container">
                {constractions.map((constraction, index) => {
                    return <ConstractionPreview
                        key={constraction.start}
                        number={index}
                        constraction={constraction}
                        prevConstraction={constractions[index - 1]}
                        onRemoveConstraction={onRemoveConstraction}
                    />
                })}
            </div>
            {constractions.length > 0
                && <div className="reset-list">
                    <button onClick={onClearConstractions}><FaHistory /> אפס רשימה</button>
                </div>}
        </div>
    )
}