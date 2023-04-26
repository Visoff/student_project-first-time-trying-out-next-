import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function func() {
    const router = useRouter()
    console.log(router.query)
    const {form, code} = router.query
    const [Submition_values, setSubmition_values] = useState([] as {id:number, field:number, value:string, submition:number, field_header:string}[]);
    useEffect(() => {
        (async () => {
            setSubmition_values(await (await fetch(`http://176.119.159.214:3000/api/form/${form}/submit`, {method:"GET"})).json())
        })()
    }, [form])
    if (form == undefined) {
        return <></>
    }
    return (
        <>
            <Head>
                <title>Analytics</title>
            </Head>
            {Submition_values?.map((el, i) => {return <div key={i}>{el.field_header}:{el.value}</div>})}
        </>
    )
}