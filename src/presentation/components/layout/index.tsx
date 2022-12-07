import { PropsWithChildren } from 'react'

import Header from './Header'
import Footer from './Footer'
import LauncherChatBox from '../launcher/LauncherChatBox'

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <LauncherChatBox />
            <Footer />
        </>
    )
}
