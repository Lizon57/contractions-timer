import { MAX_CONSTRACTIONS_LAPS } from "../consts/constraction-laps"
import { CONSTRACTION_STORAGE_KEY } from "../consts/storage-keys"
import { TimerDuration } from "../types/timer-duration"
import { localStorageService } from "./local-storage.service"


function getConstractionList() {
    return localStorageService.read(CONSTRACTION_STORAGE_KEY) || []
}

function saveConstractionList(constractions?: Array<TimerDuration>) {
    if (constractions) localStorageService.save(CONSTRACTION_STORAGE_KEY, constractions)
    else localStorageService.save(CONSTRACTION_STORAGE_KEY, [])
}

function addConstractionTime(constraction: TimerDuration) {
    const constractionLaps: Array<TimerDuration> = getConstractionList()

    if (constractionLaps.length >= MAX_CONSTRACTIONS_LAPS) constractionLaps.shift()

    constractionLaps.push(constraction)
    saveConstractionList(constractionLaps)
}

function removeConstraction(startTime: number) {
    let constractionLaps: Array<TimerDuration> = getConstractionList()
    constractionLaps = constractionLaps.filter(constraction => constraction.start !== startTime)

    saveConstractionList(constractionLaps)
    return constractionLaps
}




export const constractionsService = {
    getConstractionList,
    saveConstractionList,
    addConstractionTime,
    removeConstraction
}