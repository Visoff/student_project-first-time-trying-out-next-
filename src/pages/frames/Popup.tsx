interface Props {
    PopupActiveState:[boolean, Function]
}

export default function Popup({PopupActiveState, children}:React.PropsWithChildren<Props>) {
    const [PopupActive, setPopupActive] = PopupActiveState
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