export const getRandomNumber = (maxNum: number): number => {
    return Math.floor(Math.random() * maxNum)
}

export const getRandomColor = (): string => {
    const h = getRandomNumber(360)
    const s = getRandomNumber(100)
    const l = 85
    return `hsl(${h}deg, ${s}%, ${l}%)`
}
