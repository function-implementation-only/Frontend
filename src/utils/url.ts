export function kakaoURL(apiKey: string, uri: string): string {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${uri}&response_type=code`
}

export function googleURL(id: string, uri: string): string {
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${id}&redirect_uri=${uri}&response_type=code&scope=profile%20email`
}
