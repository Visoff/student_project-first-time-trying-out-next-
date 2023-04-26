// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import MongoDb, { MongoClient } from "mongodb"


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
