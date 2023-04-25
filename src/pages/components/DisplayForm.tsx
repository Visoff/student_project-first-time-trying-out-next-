import { useEffect, useState } from "react"

interface Props {
    formId:number
}
type form = {
        field_id:number,
        field_header:string,
        field_type:string,
        field_placeholder:string,
        page_id:number,
        form_name:string,
}[]

export default function DisplayFrom({formId}:Props) {
    const [form, setForm] = useState([] as form)
    useEffect(() => {
        (async () => {
            setForm(await (await fetch(`http://localhost:3000/api/form/${formId}/full`, {method:"GET"})).json())
        })()
    }, [])
    const [pages, setPages] = useState(form.map(el => {return el.page_id}).filter((val, i, arr) => {return arr.indexOf(val) == i}))
    useEffect(() => {
        setPages(form.map(el => {return el.page_id}).filter((val, i, arr) => {return arr.indexOf(val) == i}))
    }, [form])
    const [CurrentPage, setCurrentPage] = useState(0)

    const [Answers, setAnswers] = useState({} as any)
    useEffect(() => {
        var ans:any = {}
        form.forEach(el => {ans[el.field_id] = ""})
        setAnswers(ans)
    }, [form])
    if (form.length == 0) {
        return <></>
    }

    async function send() {
        const res = await fetch(`http://localhost:3000/api/form/${formId}/submit`, {
            method:"POST",
            body:JSON.stringify(Answers)
        })
        console.log(await res.text())
    }

    return (
        <>
            <h1>{form[0].form_name}</h1>
            {form.filter(el => {return el.page_id == pages[CurrentPage]}).map((el, i) => {
                return <div key={i}>
                    <h2>{el.field_header}</h2>
                    {el.field_type == "checkbox" ?
                        <input type={el.field_type} placeholder={el.field_placeholder} checked={Answers[el.field_id]} onChange={(e) => {setAnswers({...Answers, [el.field_id]:e.target.checked})}} />
                        : 
                        <input type={el.field_type} placeholder={el.field_placeholder} value={Answers[el.field_id]} onChange={(e) => {setAnswers({...Answers, [el.field_id]:e.target.value})}} />
                    }
                </div>
            })}
            {pages.length-1 == CurrentPage ? <button onClick={() => {send()}}>Отправить</button> : <button onClick={() => {setCurrentPage(CurrentPage+1)}}>На след. страницу</button>}
        </>
    )
}