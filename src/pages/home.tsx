import { useEffect, useState } from "react"
import { TimerButton } from "../components/timer-button"
import { Title } from "../components/title"
import { TimerDuration } from "../types/timer-duration"
import { constractionsService } from "../services/constractions.service"
import { ConstractionsList } from "../components/constractions-list"
import { EMPTY_TIMER_DURATION } from "../consts/empty-timer-duration"

export const Home = () => {
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [timerDuration, setTimerDuration] = useState<TimerDuration>(EMPTY_TIMER_DURATION)
    const [constractions, setConstractions] = useState<Array<TimerDuration>>(constractionsService.getConstractionList())

    useEffect(() => {
        if (!timerDuration.end) return

        const currConstractions = structuredClone(constractions)

        constractionsService.addConstractionTime(timerDuration)
        currConstractions.push(timerDuration)
        setConstractions(currConstractions)
        setTimerDuration(EMPTY_TIMER_DURATION)
    }, [timerDuration])

    const onTimerButtonClick = () => {
        const prevIsTimerRunning = isTimerRunning
        setIsTimerRunning(!isTimerRunning)

        if (!prevIsTimerRunning) {
            setTimerDuration({
                ...timerDuration,
                start: Date.now()
            })
        } else {
            setTimerDuration({
                ...timerDuration,
                end: Date.now()
            })
        }
    }

    return (
        <div className="home-page-container">
            <div className="content-container">
                <Title />
                <ConstractionsList constractions={constractions} />
                <TimerButton onClick={onTimerButtonClick} isTimerRunning={isTimerRunning} />
            </div>
        </div>
    )
}
