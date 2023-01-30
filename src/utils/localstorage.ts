export function setItemToLocalStorage<T>(key: string, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function getItemToLocalStorage(key: string) {
    return JSON.parse(window.localStorage.getItem(key))
}

export function removeItemFromLocalStorage(key: string): void {
    window.localStorage.removeItem(key)
}

export function clearLocalstroage(): void {
    window.localStorage.clear()
}
