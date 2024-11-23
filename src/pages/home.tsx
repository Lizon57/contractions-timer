import { useState } from "react"
import { TimerButton } from "../components/timer-button"
import { Title } from "../components/title"

export const Home = () => {
    const [isTimerRunning, setIsTimerRunning] = useState(false)


    const onTimerButtonClick = () => {
        setIsTimerRunning(!isTimerRunning)
    }

    return (
        <div className="home-page-container">
            <div className="content-container">
                <Title />
                <TimerButton onClick={onTimerButtonClick} isTimerRunning={isTimerRunning} />
            </div>
        </div>
    )
}
