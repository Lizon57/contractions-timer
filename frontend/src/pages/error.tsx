import { APP_MESSAGES } from "../consts/app-phrases"

export const Error = () => {
    return (
        <div className="error-section-container">
            <div className="error-indicator-container">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12h.01"></path>
                    <path d="M15 12h.01"></path>
                    <path d="M10 16c.5-.3 1.2-.5 2-.5s1.5.2 2 .5"></path>
                    <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"></path>
                </svg>

                <div className="disclaimer">{APP_MESSAGES.general_error}</div>
            </div>
        </div>
    )
}