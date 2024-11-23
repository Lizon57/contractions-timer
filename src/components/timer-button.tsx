import { FaPause, FaPlay } from "react-icons/fa"

type TimerButtonProps = {
    onClick: () => void;
    isTimerRunning: Boolean;
}

export const TimerButton: React.FC<TimerButtonProps> = ({ onClick, isTimerRunning }) => {
    return (
        <div className="timer-button-container">
            <button onClick={onClick}>
                {isTimerRunning ? <FaPause /> : <FaPlay />}
            </button>
        </div>
    )
}