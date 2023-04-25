import Head from "next/head";
import { useRouter } from "next/router";
import DisplayFrom from "./components/DisplayForm";

export default function () {
    const router = useRouter()
    const { form } = router.query
    return (<>
        <Head>
            <title>Take a form</title>
        </Head>
        {typeof form == "string" ? 
            <DisplayFrom formId={Number.parseInt(form)} />
            : ""
        }
    </>)
}