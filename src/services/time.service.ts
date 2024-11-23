function getHHMMDisplayTime(ms: number) {
    const time = new Date(ms)
    const hours = time.getHours()
    const minutes = time.getMinutes()

    return `${hours}:${minutes}`
}

function getMSDifference(ms1: number, ms2: number) {
    if (ms1 > ms2) {
        return ms1 - ms2
    } else {
        return ms2 - ms1
    }
}

function getMMSSDifferenceDisplay(ms: number) {
    if (ms > 1200000) return
    const secondAmmount = Math.floor(ms / 1000)

    if (secondAmmount < 1) {
        return '00:00'
    }

    const minuteAmmount = Math.floor(secondAmmount / 60)
    const remainingSecondAmmount = secondAmmount % 60
    const paddedMinuteAmmount = minuteAmmount < 10 ? `0${minuteAmmount}` : `${minuteAmmount}`
    const paddedSecondAmmount = remainingSecondAmmount < 10 ? `0${remainingSecondAmmount}` : `${remainingSecondAmmount}`

    return `${paddedMinuteAmmount}:${paddedSecondAmmount}`
}



export const timeService = {
    getHHMMDisplayTime,
    getMSDifference,
    getMMSSDifferenceDisplay
} 