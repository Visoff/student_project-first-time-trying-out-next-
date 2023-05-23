// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pg from 'pg'

declare global {
    var postgres:pg.Client;
}

const postgres = new pg.Client({
  user:process.env.DB_USER||"some_user",
  host:process.env.DB_HOST||"db",
  database:"dev",
  password:process.env.DB_PASSWORD||"some_password",
  port:5432
})

postgres.connect().then(e => {console.log("postgres connected")}).catch(e => {console.error(e)})
globalThis.postgres = postgres

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    const { form } = req.query
    switch (req.method) {
      case "GET":
        res.status(200).json((await globalThis.postgres.query(`
        select
            field.id as field_id,
            field.header as field_header,
            field.type as field_type,
            field.placeholder as field_placeholder,
            page.id as page_id,
            forms.id as form_id,
            forms.name as form_name
        from field
            inner join page on page.id = field.form_page and page.form = ${form}
            inner join forms on forms.id = page.form
        order by field.id
        `)).rows satisfies {
            field_id:number,
            field_header:string,
            field_type:"text"|"email"|"checkbox"|"number",
            field_placeholder:string,
            page_id:number,
            form_id:number,
            form_name:string
          }[])
      break
  }
}
