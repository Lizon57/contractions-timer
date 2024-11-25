import { useEffect, useState } from "react"
import { TimerButton } from "../components/timer-button"
import { Title } from "../components/title"
import { TimerDuration } from "../types/timer-duration"
import { constractionsService } from "../services/constractions.service"
import { ConstractionsList } from "../components/constractions-list"
import { EMPTY_TIMER_DURATION } from "../consts/empty-timer-duration"
import { Loading } from "../components/loading"
import { APP_MESSAGES } from "../consts/app-phrases"

export const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [timerDuration, setTimerDuration] = useState<TimerDuration>(EMPTY_TIMER_DURATION)
    const [constractions, setConstractions] = useState<Array<TimerDuration>>(constractionsService.getConstractionList())


    useEffect(() => {
        queryConstractions()
    }, [])


    async function queryConstractions() {
        try {
            const data: TimerDuration[] = []
            setConstractions(data)
            setIsLoading(false)
        } catch (_) {
            setIsError(true)
        }
    }


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

    const onRemoveConstraction = (startTime: number) => {
        const newConstractions = constractionsService.removeConstraction(startTime)
        setConstractions(newConstractions)
    }

    const onClearConstractions = () => {
        const shouldClearConstractions = confirm(APP_MESSAGES.delete_all_confirm)
        if (!shouldClearConstractions) return

        constractionsService.saveConstractionList()
        setConstractions([])
    }

    if (isLoading) return <Loading />


    return (
        <div className="home-page-container">
            <div className="content-container">
                <Title />
                <ConstractionsList
                    constractions={constractions}
                    onRemoveConstraction={onRemoveConstraction}
                    onClearConstractions={onClearConstractions}
                />
                <TimerButton onClick={onTimerButtonClick} isTimerRunning={isTimerRunning} />
            </div>
        </div>
    )
}
