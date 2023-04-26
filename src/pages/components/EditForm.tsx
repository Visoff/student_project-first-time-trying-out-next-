import { useEffect, useState } from "react"
import Input from "./Input"

interface Props {
    OriginForm:{
        id:number,
        name:string
    }
}

type form = {
        field_id:number,
        field_header:string,
        field_type:string,
        field_placeholder:string,
        page_id:number,
        form_name:string
}[]

export default function EditForm({OriginForm}:Props) {
    const [form, setForm] = useState([] as any as form)
    const [CurrentPage, setCurrentPage] = useState(0)

    const [RandInt, setRandInt] = useState(0)

    const [Pages, setPages] = useState([] as {id:number, form:number}[])

    useEffect(() => {
        (async () => {
            setForm(await (await fetch(`http://176.119.159.214:3000/api/form/${OriginForm.id}/full`, {method:"GET"})).json())
        })()
    }, [RandInt])

    useEffect(() => {
        (async () => {
            setPages(await (await fetch(`http://176.119.159.214:3000/api/form/${OriginForm.id}/page`, {method:"GET"})).json())
        })()
        console.log(Pages)
    }, [RandInt])
    if (form.length == 0) {return <></>}

    async function createNewPage() {
        console.log(await (await fetch(`http://176.119.159.214:3000/api/form/${OriginForm.id}/page`, {
            method:"POST"
        })).json())
        setRandInt(Math.floor(Math.random()*100))
    }
    async function createNewField() {
        await fetch(`http://176.119.159.214:3000/api/page/${Pages[CurrentPage].id}/field`, {
            method:"POST",
            body:JSON.stringify({
                header:"Название",
                type:"text",
                placeholder:"Текст"
            })
        })
        setRandInt(Math.floor(Math.random()*100))
    }

    return (
        <>
            <h1>{form[0].form_name}</h1>
            {CurrentPage!=0?<button onClick={e => {setCurrentPage(CurrentPage-1); setRandInt(Math.floor(Math.random()*100))}}>{"<"}</button>:<></>}
            {CurrentPage!=Pages.length-1?<button onClick={e => {setCurrentPage(CurrentPage+1); setRandInt(Math.floor(Math.random()*100))}}>{">"}</button>:<button onClick={e => {createNewPage()}}>+</button>}
            <div>
                {
                    form.filter((el:any) => {return Pages[CurrentPage] != undefined && el.page_id == Pages[CurrentPage].id}).map((el, i) => {
                        return <div key={el.field_id}>
                            <Input type="text" placeholder="Название" defaultValue={el.field_header} onTimedChange={async (newHeader: string) => {
                                await fetch(`http://176.119.159.214:3000/api/field/${el.field_id}`, {
                                    method:"PATCH",
                                    body:JSON.stringify({
                                        header:newHeader
                                    })
                                })
                                setRandInt(Math.floor(Math.random()*100))
                            }}/>
                            <select onChange={e => {
                                (async () => {
                                    await fetch(`http://176.119.159.214:3000/api/field/${el.field_id}`, {
                                        method:"PATCH",
                                        body:JSON.stringify({
                                            type:e.target.value
                                        })
                                    })
                                    setRandInt(Math.floor(Math.random()*100))
                                })()
                            }} defaultValue={el.field_type}>
                                <option value="text">строка</option>
                                <option value="number">число</option>
                                <option value="email">почта</option>
                                <option value="checkbox">клик!</option>
                            </select>
                            <Input type="text" placeholder="Пример" defaultValue={el.field_placeholder} onTimedChange={async (newPlaceholder: string) => {
                                await fetch(`http://176.119.159.214:3000/api/field/${el.field_id}`, {
                                    method:"PATCH",
                                    body:JSON.stringify({
                                        placeholder:newPlaceholder
                                    })
                                })
                                setRandInt(Math.floor(Math.random()*100))
                            }}/>
                        </div>
                    }
                )}
                <button onClick={e => {createNewField()}}>+</button>
            </div>
        </>
    )
}