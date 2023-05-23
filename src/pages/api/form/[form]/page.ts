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
        res.status(200).json((await globalThis.postgres.query(`select page.* from page where page.form = ${form}`)).rows as {id:number, form:number/* form id */}[])
      break
      case "POST":
        res.status(200).json((await globalThis.postgres.query(`insert into page(form) values(${form}) returning id`)).rows[0].id satisfies number)
        break
      case "PATCH":
        break
  }
}
