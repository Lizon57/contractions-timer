type ConstractionPreviewProps = {
    number: number
}


export const ConstractionPreview: React.FC<ConstractionPreviewProps> = ({ number }) => {
    return (
        <div className="constraction-preview-container">
            <span className="count">{number + 1}</span>
            <span className="time">התחלה</span>
            <span className="time">סיום</span>
            <span className="duration">זמן</span>
            <span className="duration-gap">ציר קודם</span>
            <span className="remove"></span>
        </div>
    )
}