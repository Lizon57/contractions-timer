function read(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return
    return JSON.parse(value)
}

function save<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
}


export const localStorageService = {
    read,
    save,
}