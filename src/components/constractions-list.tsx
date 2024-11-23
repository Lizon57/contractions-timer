import { TimerDuration } from "../types/timer-duration"
import { ConstractionPreview } from "./constraction-preview"
import { ConstractionsListHead } from "./constractions-list-head"

type ConstractionsListProps = {
    constractions: Array<TimerDuration>
}


export const ConstractionsList: React.FC<ConstractionsListProps> = ({ constractions }) => {


    return (
        <div className="constractions-list-container">
            <ConstractionsListHead />
            <div className="list-container">
                {constractions.map((constraction, index) => {
                    return <ConstractionPreview key={constraction.start} number={index} />
                })}
            </div>
        </div>
    )
}