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
        res.status(200).json((await globalThis.postgres.query(`select submition_value.submition as id, field.id as field, submition_value.value from submition_value, field.header as field_header inner join submition on submition_value.submition = submition.id and submition.form = ${form} inner join field on submition_value.field = field.id`)).rows satisfies {id:number, field:number, value:string, submition:number, field_header:string}[])
      break
      case "POST":
        const body = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
        const id = (await globalThis.postgres.query(`insert into submition(form) values(${form}) returning id`)).rows[0].id
        await Promise.all([
            Object.keys(body).map(key => {
                return globalThis.postgres.query(`insert into submition_value(field, value, submition) values(${key}, '${body[key]}', ${id})`)
            })
        ])
        res.status(200).json("ok")
        break
  }
}
