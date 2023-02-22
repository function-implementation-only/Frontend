export type PopupProps = {
    type?: string
    content: string
    buttons?: PopupButton[]
}

export interface PopupObj {
    id: string
    props: PopupProps
}

export type PopupButton = {
    label: string
    clickHandler: Function
}
