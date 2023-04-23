import Head from 'next/head'
import Main from './frames/Main'
import { useState } from 'react'
import Popup from './frames/Popup'

export default function Home() {
  const [PopupActive, setPopupActive] = useState(false)
  const [PopupContent, setPopupContent] = useState(<>123</>)

  const OpenPopup = (el:JSX.Element) => {
    setPopupActive(true)
    setPopupContent(el)
  }

  return (
    <>
      <Head>
        <title>Student App</title>
        <meta name="description" content="Student labs project Kalinin Ilya 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main openPopup={OpenPopup}></Main>
      {PopupActive ? <Popup PopupActiveState={[PopupActive, setPopupActive]}>{PopupContent}</Popup> : undefined}
    </>
  )
}
