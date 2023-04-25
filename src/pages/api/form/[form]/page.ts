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
        res.status(200).json((await globalThis.postgres.query(`select page.* from page where page.form = ${form}`)).rows)
      break
      case "POST":
        res.status(200).json((await globalThis.postgres.query(`insert into page(form) values(${form})`)).rows)
        break
      case "PATCH":
        break
  }
}
