import DefaultPopup from 'components/popup/DefaultPopup'
import ReactDOM from 'react-dom'
import { PopupObj, PopupProps } from 'types/popup'
import { v4 as uuidv4 } from 'uuid'

export interface PopupAPIInterface {
    show: (props: PopupProps) => void
    closeTopPopup: () => void
}

export class PopupAPI implements PopupAPIInterface {
    popupStack: PopupObj[]

    constructor() {
        this.popupStack = []
    }

    show(props: PopupProps) {
        const id = uuidv4()

        const popupObj = {
            id,
            props,
        }

        this.popupStack.push(popupObj)

        const rootEl = document.getElementById('root')
        const popupEl = document.createElement('div')

        popupEl.id = id
        popupEl.classList.add('popup')

        rootEl.append(popupEl)
        ReactDOM.render(DefaultPopup(props), popupEl)
    }

    closeTopPopup() {
        if (this.popupStack.length === 0) return
        const { id } = this.popupStack.pop()
        const popupEl = document.getElementById(id)

        popupEl.remove()
    }

    closeAllPopup() {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.popupStack.length; i++) {
            this.closeTopPopup()
        }
    }
}
