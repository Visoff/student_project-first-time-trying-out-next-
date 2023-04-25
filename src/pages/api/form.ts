// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    switch (req.method) {
      case "GET":
        res.status(200).json((await globalThis.postgres.query("select id, name from forms")).rows)
        break
      case "POST":
      req.body = JSON.parse(req.body)

      if (!(req.body != undefined &&
        typeof req.body.name == "string"
      )) {return res.status(400).json("you messed up")}

      res.status(200).json((await globalThis.postgres.query(`insert into forms(name) values('${req.body.name}')`)).rows)
      break
      case "PATCH":
        break
  }
}
