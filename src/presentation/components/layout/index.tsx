import { PropsWithChildren, useState } from 'react';

import Header from './header';
import Footer from './footer';
import LauncherChatBox from '../launcher/LauncherChatBox';

export default function Layout({ children }: PropsWithChildren) {
  const [isShowLauncherBox, setIsShowLauncherBox] = useState(false);

  return (
    <>
      <Header />
      <main>{children}</main>
      <LauncherChatBox/>
      <Footer />
    </>
  );
}
