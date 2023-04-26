// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    const { field } = req.query
    switch (req.method) {
      case "GET":
        res.status(200).json((await globalThis.postgres.query(`select field.*  where field.id = ${field}`)).rows satisfies {id:number, header:string, type:"text"|"email"|"checkbox"|"number", placeholder:string}[])
      break
      case "PATCH":
        const body = JSON.parse(req.body);
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
