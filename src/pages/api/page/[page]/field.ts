// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    const { page } = req.query
    switch (req.method) {
      case "GET":
        res.status(200).json((await globalThis.postgres.query(`select field.* from field where field.form_page = ${page}`)).rows satisfies {id:number, header:string, type:"text"|"email"|"checkbox"|"number", placeholder:string}[])
      break
      case "POST":
        req.body = JSON.parse(req.body)
  
        if (!(req.body != undefined &&
          typeof req.body.header == "string" &&
          typeof req.body.type == "string" &&
          typeof req.body.placeholder == "string"
        )) {return res.status(400).json("you messed up")}

        res.status(200).json((await globalThis.postgres.query(`insert into field(header, type, placeholder, form_page) values('${req.body.header}', '${req.body.type}', '${req.body.placeholder}', ${page}) returning id`)).rows[0].id)
        break
      case "PATCH":
        break
  }
}
