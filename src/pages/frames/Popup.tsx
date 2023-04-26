interface Props {
    PopupActive:boolean,
    setPopupActive:Function
}

export default function Popup({PopupActive, setPopupActive, children}:React.PropsWithChildren<Props>) {
    return (
        <div className="popup" onClick={(e) => {
            if ((e.target as HTMLElement).classList.contains("popup")) {
                setPopupActive(false)
            }
        }}>
            <div>
                {children}
            </div>
        </div>
    )
}