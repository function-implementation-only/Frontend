export function saveTokenToCookie(value: string): void {
    document.cookie = `token=${value}`
}

export function saveUserToCookie(value: string): void {
    document.cookie = `username=${value}`
}

export function getTokenFromCookie(): string {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
    )
}

export function getUserFromCookie(): string {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
    )
}

export function deleteCookie(value: string) {
    document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
