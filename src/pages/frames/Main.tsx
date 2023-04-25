import { useEffect, useState } from "react"
import style from "./Main.module.css"
import DisplayFrom from "../components/DisplayForm"
import EditForm from "../components/EditForm"

interface Props {
    openPopup:Function
}

export default function Main({openPopup}:Props) {
    const [Forms, setForms] = useState([])
    const [AllForms, setAllForms] = useState([])
    const [FormId, setFormId] = useState(1)
    useEffect(() => {
        (async () => {
            setForms(await (await fetch(`http://localhost:3000/api/form/${FormId}/full`, {method:"GET"})).json())
        })()
    }, [FormId])
    useEffect(() => {
        (async () => {
            setAllForms(await (await fetch(`http://localhost:3000/api/form`, {method:"GET"})).json())
        })()
    }, [])
    return (
        <div className={style.container}>
            <input type="number" value={FormId} onChange={e => {setFormId(Number.parseInt((e.target as HTMLInputElement).value))}} />
            <button onClick={() => {
                openPopup(<DisplayFrom formId={FormId} />)
            }}>GET</button>
            <button onClick={() => {
                openPopup(<>
                    <form onSubmit={e => {
                        e.preventDefault();
                        console.log(e)
                        fetch("http://localhost:3000/api/form", {
                            method:"POST",
                            body:JSON.stringify({
                                "name":((e.target as HTMLFormElement)[0] as HTMLInputElement).value
                            })
                        })
                    }}>
                        <input type="text" name="name" />
                        <button type="submit">Submit</button>
                    </form>
                </>)
            }}>POST</button>
            <button onClick={e => {
                openPopup(<>
                    {AllForms.map((el:{id:number, name:string}) => {
                        return <button onClick={e => {
                            openPopup(<>
                                <EditForm OriginForm={el} />
                            </>)
                        }}>{el.name}</button>
                    })}
                </>)
            }}>UPDATE</button>
        </div>
    )
}