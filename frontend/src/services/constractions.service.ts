import { CONSTRACTION_STORAGE_KEY } from "../consts/storage-keys"
import { TimerDuration } from "../types/timer-duration"
import { httpService } from "./http.service"
import { localStorageService } from "./local-storage.service"


async function getConstractionListFromDB() {
    try {
        const data = await httpService.get('') as TimerDuration[]
        localStorageService.save(CONSTRACTION_STORAGE_KEY, data)
        return data
    } catch (err) {
        throw new Error('Couldn\'t query constraction list DB')
    }
}

async function addConstractionToDB(constraction: TimerDuration) {
    try {
        const savedConstraction = await httpService.post('', constraction) as TimerDuration[]
        const newConstractions = localStorageService.read(CONSTRACTION_STORAGE_KEY)
        newConstractions.push(savedConstraction)
        localStorageService.save(CONSTRACTION_STORAGE_KEY, newConstractions)
        return newConstractions
    } catch (err) {
        throw new Error('Couldn\'t add constraction to DB')
    }
}

async function removeConstractionFromDB(id?: string) {
    try {
        await httpService.delete(`removeById/${id}`, id) as TimerDuration
        let constractions = localStorageService.read(CONSTRACTION_STORAGE_KEY)
        constractions = constractions.filter((constraction: TimerDuration) => constraction._id !== id)
        localStorageService.save(CONSTRACTION_STORAGE_KEY, constractions)
        return constractions
    } catch (err) {
        throw new Error('Couldn\'t remove constraction from DB')
    }
}

async function removeAllConstractionsFromDB() {
    try {
        await httpService.delete('')
        localStorageService.save(CONSTRACTION_STORAGE_KEY, [])
        return []
    } catch (err) {
        throw new Error('Couldn\'t remove constraction from DB')
    }
}




export const constractionsService = {
    getConstractionListFromDB,
    addConstractionToDB,
    removeConstractionFromDB,
    removeAllConstractionsFromDB,
}