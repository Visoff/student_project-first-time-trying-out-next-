import { useEffect, useState } from "react"
import style from "./Main.module.css"

interface Props {
    openPopup:Function
}

export default function Main({openPopup}:Props) {
    const [Forms, setForms] = useState([])
    useEffect(() => {
        (async () => {
            setForms(await (await fetch("http://localhost:3000/api/form", {method:"GET"})).json())
        })()
    }, [])
    return (
        <div className={style.container}>
            123
            <button onClick={() => {
                openPopup(<>
                    {Forms.map((e:any) => {return <div key={e.name}>
                        <h1>{e.header}</h1>
                        <input type="text" placeholder={e.placeholder} />
                    </div>})}
                </>)
            }}>open</button>
            <button onClick={() => {
                openPopup(<>
                    <form onSubmit={e => {
                        e.preventDefault();
                        console.log(e)
                        fetch("http://localhost:3000/api/form", {
                            method:"POST",
                            body:JSON.stringify({
                                "name":((e.target as HTMLFormElement)[0] as HTMLInputElement).value,
                                "type":((e.target as HTMLFormElement)[0] as HTMLSelectElement).value
                            })
                        })
                    }}>
                        <input type="text" name="name" />
                        <select name="type">
                            <option value="text">text</option>
                            <option value="date">date</option>
                        </select>
                        <button type="submit"></button>
                    </form>
                </>)
            }}>open x2</button>
        </div>
    )
}