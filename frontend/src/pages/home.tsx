import { useEffect, useState } from "react"
import { TimerButton } from "../components/timer-button"
import { Title } from "../components/title"
import { TimerDuration } from "../types/timer-duration"
import { constractionsService } from "../services/constractions.service"
import { ConstractionsList } from "../components/constractions-list"
import { EMPTY_TIMER_DURATION } from "../consts/empty-timer-duration"
import { Loading } from "./loading"
import { Error } from "./error"
import { APP_MESSAGES } from "../consts/app-phrases"

export const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [timerDuration, setTimerDuration] = useState<TimerDuration>(EMPTY_TIMER_DURATION)
    const [constractions, setConstractions] = useState<Array<TimerDuration>>([])


    useEffect(() => {
        queryConstractions()
    }, [])

    useEffect(() => {
        if (!timerDuration.end) return
        onAddConstraction()
    }, [timerDuration])



    async function queryConstractions() {
        setIsLoading(true)

        try {
            const data: TimerDuration[] = await constractionsService.getConstractionListFromDB()
            setConstractions(data)
        } catch (_) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const onAddConstraction = async () => {
        try {
            setIsLoading(true)
            const newConstractions = await constractionsService.addConstractionToDB(timerDuration)
            setTimerDuration(EMPTY_TIMER_DURATION)
            setConstractions(newConstractions)
        } catch (_) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const onRemoveConstraction = async (id?: string) => {
        try {
            setIsLoading(true)
            const newConstractions = await constractionsService.removeConstractionFromDB(id)
            setConstractions(newConstractions)
        } catch (_) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const onClearConstractions = async () => {
        const shouldClearConstractions = confirm(APP_MESSAGES.delete_all_confirm)
        if (!shouldClearConstractions) return

        try {
            setIsLoading(true)
            await constractionsService.removeAllConstractionsFromDB()
            setConstractions([])
        } catch (_) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }



    const onTimerButtonClick = () => {
        setIsTimerRunning(!isTimerRunning)

        if (!isTimerRunning) {
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



    if (isLoading) return <Loading />
    if (isError) return <Error />


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
