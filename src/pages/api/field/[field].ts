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
    const { field } = req.query
    switch (req.method) {
      case "GET":
        res.status(200).json((await globalThis.postgres.query(`select field.* from field  where field.id = ${field}`)).rows satisfies {id:number, header:string, type:"text"|"email"|"checkbox"|"number", placeholder:string}[])
      break
      case "PATCH":
        const body = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
        const keys = Object.keys(body);
        const values = keys.map(el => {return body[el]})
        
        await globalThis.postgres.query(`update field set 
        ${keys.map((key, i) => {return `"${key}" = $${i+1}`})}
        where id = ${field}
        `, values)

        res.status(200).json("ok")
        break
  }
}
