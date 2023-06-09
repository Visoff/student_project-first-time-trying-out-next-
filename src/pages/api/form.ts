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
    switch (req.method) {
      case "GET":
        res.status(200).json((await globalThis.postgres.query("select id, name from forms")).rows satisfies {id:number, name:string}[])
        break
      case "POST":
      if (typeof req.body == "string") {
        req.body = JSON.parse(req.body)
      }

      if (!(req.body != undefined &&
        typeof req.body.name == "string"
      )) {return res.status(400).json("you messed up")}

      const form = (await globalThis.postgres.query(`insert into forms(name, code) values('${req.body.name}', '${req.body.code}') returning id`)).rows[0].id
      const page = (await globalThis.postgres.query(`insert into page(form) values('${form}') returning id`)).rows[0].id
      const field = (await globalThis.postgres.query(`insert into field(form_page, type, header, placeholder) values('${page}', 'text', '', '') returning id`)).rows[0].id
      res.status(200).json({id:form, name:req.body.name, code:req.body.code} satisfies {id:number, name:string, code:string})
      break
      case "PATCH":
        break
  }
}
